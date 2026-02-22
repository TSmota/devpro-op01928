import type { WeatherDescription } from "@repo/models";

const weatherIcons: Record<WeatherDescription, string> = {
  'clear sky': 'wi-day-sunny',
  'cloudy': 'wi-day-cloudy',
  'shower rain': 'wi-rain',
  'rain': 'wi-rain',
  'thunderstorm': 'wi-thunderstorm',
  'snow': 'wi-snow',
  'mist': 'wi-fog',
};

/**
 * Returns the corresponding Weather Icons CSS class for a given weather description.
 * 
 * @param description The weather description (e.g., 'clear sky', 'few clouds', etc.)
 * @returns The corresponding Weather Icons CSS class (e.g., 'wi-day-sunny') or an empty string if not found
 */
export function getWeatherIconClass(description: WeatherDescription): string {
  return weatherIcons[description] || '';
}
