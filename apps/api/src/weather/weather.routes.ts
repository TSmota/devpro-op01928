import { HTTPService } from "@repo/services";
import type { FastifyInstance } from "fastify";
import type { OpenWeatherGeoResponse, SearchQuery, OpenWeatherForecastResponse } from "./weather.types.js";
import type { WeatherForecast } from "@repo/models";
import type { RequestReply } from "../types.js";
import { OpenWeatherAdapter } from "./weather.adapter.js";
import { getEnvVariable } from "../envs.js";

type SearchCityRequest = {
  Querystring: SearchQuery;
  Reply: RequestReply<WeatherForecast>;
}

const httpService = new HTTPService('https://api.openweathermap.org')
const openWeatherAdapter = new OpenWeatherAdapter()

const API_KEY = getEnvVariable('OPENWEATHERMAP_API_KEY')

export function registerWeatherRoutes(server: FastifyInstance) {
  if (!API_KEY) {
    server.log.error('OPENWEATHERMAP_API_KEY is not set in environment variables')
    process.exit(1)
  }

  server.get<SearchCityRequest>('/api/search', async (request, reply) => {
    const { city } = request.query

    const geoResponse = await httpService.get<OpenWeatherGeoResponse[]>(`/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)

    if ('error' in geoResponse) {
      server.log.error(`Error fetching city data: ${geoResponse.error}`)
      return reply.code(500).send('Failed to fetch city data')
    }

    const [firstCity] = geoResponse.data

    if (!firstCity) {
      return reply.code(404).send('City not found')
    }

    const forecastResponse = await httpService.get<OpenWeatherForecastResponse>(`/data/2.5/forecast?units=imperial&lat=${firstCity.lat}&lon=${firstCity.lon}&appid=${API_KEY}`)

    if ('error' in forecastResponse) {
      server.log.error(`Error fetching forecast data: ${forecastResponse.error}`)
      return reply.code(500).send('Failed to fetch forecast data')
    }

    const forecasts = openWeatherAdapter.toDomain(forecastResponse.data)

    return reply.code(200).send({
      city: firstCity.name,
      country: firstCity.country,
      currentTemperature: forecasts[0].temp,
      currentWeather: forecasts[0].weather,
      forecasts,
    })
  })
}
