import { HTTPService } from "@repo/services";
import type { FastifyInstance } from "fastify";
import type { OpenWeatherGeoResponse, OpenWeatherForecastResponse, SearchCityRequest } from "./weather.types.js";
import { OpenWeatherAdapter } from "./weather.adapter.js";
import { getEnvVariable } from "../envs.js";

const httpService = new HTTPService('https://api.openweathermap.org')
const openWeatherAdapter = new OpenWeatherAdapter()

const API_KEY = getEnvVariable('OPENWEATHERMAP_API_KEY')

const CITY_QUERY_SCHEMA = {
  type: 'object',
  properties: {
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      // Allow letters, spaces, hyphens and apostrophes.
      pattern: "^[\\p{L}\\s\\-']+$",
    },
  },
  required: ['city'],
  additionalProperties: false,
}

export function registerWeatherRoutes(server: FastifyInstance) {
  server.get<SearchCityRequest>('/api/search', {
    schema: {
      querystring: CITY_QUERY_SCHEMA,
    },
    // Convert AJV validation errors into friendly, domain-specific messages.
    schemaErrorFormatter: (errors) => {
      const error = errors?.[0]
      if (!error) return new Error('Invalid query parameters')

      switch (error.keyword) {
        case 'required':
        case 'minLength':
          return new Error('City name cannot be empty')
        case 'maxLength':
          return new Error('City name cannot exceed 100 characters')
        case 'pattern':
          return new Error('City name contains invalid characters')
        default:
          return new Error('Invalid query parameters')
      }
    },
    handler: async (request, reply) => {
      const { city } = request.query

      const geoResponse = await httpService.get<OpenWeatherGeoResponse[]>(`/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`)

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
    }
  })
}
