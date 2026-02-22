import type { ForecastItem, WeatherDescription } from "@repo/models";
import type { OpenWeatherForecastItem, OpenWeatherForecastResponse, WeatherProviderAdapter } from "./weather.types.js";

export class OpenWeatherAdapter implements WeatherProviderAdapter {
  toDomain(data: OpenWeatherForecastResponse): ForecastItem[] {
    const forecastItems = data.list.map(item => this.mapForecastItem(item))
    
    return this.buildForecastsByDay(forecastItems);
  }

  private mapForecastItem(item: OpenWeatherForecastItem): ForecastItem {
    return {
      date: new Date(item.dt * 1000).toISOString(),
      temp: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      weather: this.getWeatherDescription(item.weather[0].id),
    };
  }

  private getWeatherDescription(weatherId: number): WeatherDescription {
    if (weatherId >= 200 && weatherId < 300) {
      return 'thunderstorm';
    }

    if (weatherId >= 300 && weatherId < 600) {
      return 'rain';
    }

    if (weatherId >= 600 && weatherId < 700) {
      return 'snow';
    }

    if (weatherId >= 700 && weatherId < 800) {
      return 'mist';
    }
    
    if (weatherId === 800) {
      return 'clear sky';
    }

    if (weatherId >= 801 && weatherId < 900) {
      return 'cloudy';
    }

    return 'clear sky'; // Default fallback
  }

  private getPredominantWeather(items: ForecastItem[]): WeatherDescription {
    const counts = new Map<WeatherDescription, number>();
    let predominant: WeatherDescription = 'clear sky';
    let maxCount = 0;

    for (const { weather } of items) {
      const newCount = (counts.get(weather) ?? 0) + 1;
      counts.set(weather, newCount);

      if (newCount > maxCount) {
        maxCount = newCount;
        predominant = weather;
      }
    }

    return predominant;
  }

  private buildForecastsByDay(data: ForecastItem[]): ForecastItem[] {
    const grouped: Record<string, ForecastItem[]> = {};

    data.forEach(item => {
      const day = item.date.split('T')[0];

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(item);
    });

    return Object.values(grouped).map(items => {
      const [first] = items;

      return {
        ...first,
        date: first.date.replace('Z', ''), // Remove timezone for display purposes
        tempMin: Math.round(Math.min(...items.map(i => i.tempMin))),
        tempMax: Math.round(Math.max(...items.map(i => i.tempMax))),
        weather: this.getPredominantWeather(items),
      };
    });
  }
}
