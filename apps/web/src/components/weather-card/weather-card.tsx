import { ForecastItem } from '@repo/models';
import './weather-card.css';
import { getWeatherIconClass } from '../../utils';

interface WeatherCardProps {
  forecast: ForecastItem;
}

function dateToDayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
}

export function WeatherCard(props: WeatherCardProps) {
  const { forecast } = props;

  return (
    <div className="c-weather-card">
      <p className="c-weather-card__label">{dateToDayLabel(forecast.date)}</p>
      <i className={`c-weather-card__icon wi ${getWeatherIconClass(forecast.weather)}`} />
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
