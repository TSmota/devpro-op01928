import type { ForecastItem, WeatherForecast } from "@repo/models";
import type { RequestReply } from "../types.js";

/**
 * Represents the query parameters for searching weather forecasts by city name.
 */
export interface SearchQuery {
  /** City name to search for */
  city: string;
}

/**
 * Represents the structure of the API response for a city search request, including the weather forecast data.
 */
export interface SearchCityRequest {
  Querystring: SearchQuery;
  Reply: RequestReply<WeatherForecast>;
}

/**
 * Represents the contract for weather provider adapters, which convert API responses to the domain model.
 */
export interface WeatherProviderAdapter {
  /**
   * Converts the raw API response to the domain model.
   * 
   * @param apiResponse The raw response from the weather API, containing forecast data and city information.
   * @returns The weather forecast in the domain model format.
   */
  toDomain: (apiResponse: OpenWeatherForecastResponse) => ForecastItem[];
}

/**
 * Types related to city search results.
 */
export interface OpenWeatherGeoResponse {
  /**
   * The country code of the city (e.g., "US" for the United States, "BR" for Brazil).
   */
  country: string;
  /**
   * The latitude of the city, used for weather data retrieval and mapping purposes.
   */
  lat: number;
  /**
   * The longitude of the city, used for weather data retrieval and mapping purposes.
   */
  lon: number;
  /**
   * The name of the city.
   */
  name: string;
  /**
   * The state or region of the city.
   */
  state: string;
}

/**
 * Root API response for weather forecast data.
 */
export interface OpenWeatherForecastResponse {
  /** Number of forecast timestamps returned */
  cnt: number;

  /** List of forecast entries */
  list: OpenWeatherForecastItem[];

  /** City information */
  city: City;
}

/**
 * Forecast data for a specific timestamp.
 */
export interface OpenWeatherForecastItem {
  /** Time of data forecasted (Unix, UTC) */
  dt: number;

  /** Main weather measurements */
  main: OpenWeatherMainWeather;

  /** Weather condition details */
  weather: OpenWeatherWeather[];

  /** Cloudiness information */
  clouds: Clouds;

  /** Wind information */
  wind: Wind;

  /**
   * Average visibility in meters.
   * Maximum value is 10,000 (10km).
   */
  visibility: number;

  /**
   * Probability of precipitation.
   * Value between 0 (0%) and 1 (100%).
   */
  pop: number;

  /** Rain volume information (if available) */
  rain?: Rain;

  /** Snow volume information (if available) */
  snow?: Snow;

  /** Additional system information */
  sys: Sys;

  /** Time of data forecasted (ISO string, UTC) */
  dt_txt: string;
}

/**
 * Main weather measurement data.
 */
export interface OpenWeatherMainWeather {
  /**
   * Temperature.
   * Unit:
   * - Default: Kelvin
   * - Metric: Celsius
   * - Imperial: Fahrenheit
   */
  temp: number;

  /**
   * Human-perceived temperature.
   * Unit:
   * - Default: Kelvin
   * - Metric: Celsius
   * - Imperial: Fahrenheit
   */
  feels_like: number;

  /**
   * Minimum temperature at the moment of calculation.
   * Optional in large urban areas.
   */
  temp_min: number;

  /**
   * Maximum temperature at the moment of calculation.
   * Optional in large urban areas.
   */
  temp_max: number;

  /** Atmospheric pressure at sea level (hPa) */
  pressure: number;

  /** Atmospheric pressure at sea level (hPa) */
  sea_level?: number;

  /** Atmospheric pressure at ground level (hPa) */
  grnd_level?: number;

  /** Humidity percentage (%) */
  humidity: number;

  /** Internal parameter */
  temp_kf: number;
}

/**
 * Weather condition description.
 */
export interface OpenWeatherWeather {
  /** Weather condition ID */
  id: number;

  /** Group of weather parameters (Rain, Snow, Clouds, etc.) */
  main: string;

  /** Weather condition description */
  description: string;

  /** Weather icon ID */
  icon: string;
}

/**
 * Cloudiness information.
 */
export interface Clouds {
  /** Cloudiness percentage (%) */
  all: number;
}

/**
 * Wind information.
 */
export interface Wind {
  /**
   * Wind speed.
   * Unit:
   * - Default/Metric: meter/sec
   * - Imperial: miles/hour
   */
  speed: number;

  /** Wind direction in meteorological degrees */
  deg: number;

  /**
   * Wind gust speed.
   * Unit:
   * - Default/Metric: meter/sec
   * - Imperial: miles/hour
   */
  gust?: number;
}

/**
 * Rain volume information.
 */
export interface Rain {
  /**
   * Rain volume for the last 3 hours (mm).
   * Only millimeters are available as unit.
   */
  "3h"?: number;
}

/**
 * Snow volume information.
 */
export interface Snow {
  /**
   * Snow volume for the last 3 hours (mm).
   * Only millimeters are available as unit.
   */
  "3h"?: number;
}

/**
 * System information.
 */
export interface Sys {
  /** Part of the day: 'd' = day, 'n' = night */
  pod: "d" | "n";
}

/**
 * City metadata.
 */
export interface City {
  /** City ID */
  id: number;

  /** City name */
  name: string;

  /** Geographic coordinates */
  coord: Coord;

  /** Country code (e.g., GB, JP) */
  country: string;

  /** City population */
  population: number;

  /** Shift in seconds from UTC */
  timezone: number;

  /** Sunrise time (Unix, UTC) */
  sunrise: number;

  /** Sunset time (Unix, UTC) */
  sunset: number;
}

/**
 * Geographic coordinates.
 */
export interface Coord {
  /** Latitude */
  lat: number;

  /** Longitude */
  lon: number;
}
