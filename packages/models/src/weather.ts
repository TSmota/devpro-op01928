/**
 * Represents a weather forecast for a specific city.
 */
export interface WeatherForecast {
  /**
   * The name of the city.
   */
  city: string;
  
  /**
   * The country code of the city (e.g., "US" for the United States, "BR" for Brazil).
   */
  country: string;

  /**
   * The current temperature in the city.
   * Unit:
   * - Default: Kelvin
   * - Metric: Celsius
   * - Imperial: Fahrenheit
   */
  currentTemperature: number;

  /**
   * A description of the current weather condition (e.g., "clear sky", "light rain").
   */
  currentWeather: WeatherDescription;

  /**
   * A list of forecast entries, each containing weather data for a specific timestamp.
   */
  forecasts: ForecastItem[];
}

export type WeatherDescription = 
 | 'clear sky'
 | 'cloudy'
 | 'shower rain'
 | 'rain'
 | 'thunderstorm'
 | 'snow'
 | 'mist';

/**
 * Forecast data for a specific timestamp.
 */
export interface ForecastItem {
  /** Time of data forecasted (ISO string, UTC) */
  date: string;

  /**
   * Temperature.
   * Unit:
   * - Default: Kelvin
   * - Metric: Celsius
   * - Imperial: Fahrenheit
   */
  temp: number;
  
  /**
   * Minimum temperature at the moment of calculation.
   */
  tempMin: number;
  
  /**
   * Maximum temperature at the moment of calculation.
   */
  tempMax: number;

  /**
   * A description of the weather condition.
   */
  weather: WeatherDescription;
}
