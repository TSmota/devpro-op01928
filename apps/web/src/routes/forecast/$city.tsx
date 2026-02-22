import { createFileRoute } from '@tanstack/react-router';

import './style.css';
import { useForecastContext } from '../../context/forecast-context';
import { Loader } from '../../components/loader/loader';
import { useEffect } from 'react';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { getWeatherIconClass } from '../../utils';

export const Route = createFileRoute('/forecast/$city')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();
  const { loading, forecast, searchCity } = useForecastContext();

  useEffect(() => {
    if (forecast || loading) {
      return;
    }

    searchCity(params.city);
  }, [forecast, loading, params.city])

  if (!forecast || loading) {
    return (
      <section className="weather gradient-background text-white">
        <Loader />
      </section>
    )
  }

  return (
    <section className="weather gradient-background text-white">
      <h2 className="weather__title">Weather</h2>
      <div className="weather__image text-center">
        <i className={`wi ${getWeatherIconClass(forecast.currentWeather)}`} />
      </div>
      <h3 className="weather__city">{forecast.city}</h3>
      <p className="weather__temperature">{forecast.currentTemperature}°F</p>

      <section className="weather__details">
        <h4 className="weather__details-title">5-Day Forecast</h4>

        <div className="weather__details-list">
          {forecast.forecasts.map((data) => (
            <WeatherCard key={data.date} forecast={data} />
          ))}
        </div>

        <div className="weather__details-disclaimer">
          <p>Users are advised to consult official government sources and exercise their own judgment when making decisions
            based on weather conditions. The App and its developers are not liable for any direct, indirect, incidental, or
            consequential damages or losses arising from the use of or reliance on information provided by the App.</p>

          <p>By using this App, you agree to assume full responsibility for any decisions or actions taken based on its content.</p>
        </div>
      </section>
    </section>
  )
}
