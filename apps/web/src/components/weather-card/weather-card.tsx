import './weather-card.css';

interface WeatherCardProps {
  label: string;
  lowestTemperature: number;
  highestTemperature: number;
  weather: string;
}

const weatherIcons: Record<string, string> = {
  'Sunny': 'wi-day-sunny',
  'Partly Cloudy': 'wi-day-cloudy',
  'Rainy': 'wi-rain',
  'Cloudy': 'wi-cloudy',
};

export function WeatherCard(props: WeatherCardProps) {
  const { label, lowestTemperature, highestTemperature, weather } = props;

  return (
    <div className="c-weather-card">
      <p className="c-weather-card__label">{label}</p>
      <i className={`c-weather-card__icon wi ${weatherIcons[weather]}`} />
      <div className="c-weather-card__temperature">
        <span className="c-weather-card__temperature-value">
          <p>L</p>
          <p>{lowestTemperature}°</p>
        </span>
        <span className="c-weather-card__temperature-value">
          <p>H</p>
          <p>{highestTemperature}°</p>
        </span>
      </div>
    </div>
  )
}
