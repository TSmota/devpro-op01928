import { ForecastItem } from '@repo/models';
import './weather-card.css';

interface WeatherCardProps {
  forecast: ForecastItem;
}

const weatherIcons: Record<string, string> = {
  'Sunny': 'wi-day-sunny',
  'Partly Cloudy': 'wi-day-cloudy',
  'Rainy': 'wi-rain',
  'Cloudy': 'wi-cloudy',
};

export function WeatherCard(props: WeatherCardProps) {
  const { forecast } = props;

  return (
    <div className="c-weather-card">
      <p className="c-weather-card__label">{forecast.date}</p>
      <i className={`c-weather-card__icon wi ${weatherIcons[forecast.weather]}`} />
      <div className="c-weather-card__temperature">
        <span className="c-weather-card__temperature-value">
          <p>L</p>
          <p>{forecast.tempMin}°</p>
        </span>
        <span className="c-weather-card__temperature-value">
          <p>H</p>
          <p>{forecast.tempMax}°</p>
        </span>
      </div>
    </div>
  )
}
