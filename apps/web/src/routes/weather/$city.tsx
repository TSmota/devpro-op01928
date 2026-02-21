import { createFileRoute } from '@tanstack/react-router';

import './style.css';
import { WeatherCard } from '../../components/weather-card/weather-card';

export const Route = createFileRoute('/weather/$city')({
  component: RouteComponent,
})

const mockData = [
  { label: 'Today', lowestTemperature: 70, highestTemperature: 80, weather: 'Sunny' },
  { label: 'Tuesday', lowestTemperature: 68, highestTemperature: 78, weather: 'Partly Cloudy' },
  { label: 'Wednesday', lowestTemperature: 65, highestTemperature: 75, weather: 'Rainy' },
  { label: 'Thursday', lowestTemperature: 60, highestTemperature: 70, weather: 'Cloudy' },
  { label: 'Friday', lowestTemperature: 62, highestTemperature: 72, weather: 'Sunny' },
]

function RouteComponent() {
  const { city } = Route.useParams()

  return (
    <section className="weather">
      <h2 className="weather__title">Weather</h2>
      <div className="weather__image">
        <i className="wi wi-day-sunny" />
      </div>
      <h3 className="weather__city">{city}</h3>
      <p className="weather__temperature">80°F</p>

      <section className="weather__details">
        <h4 className="weather__details-title">5-Day Forecast</h4>

        <div className="weather__details-list">
          {mockData.map((data) => (
            <WeatherCard key={data.label} {...data} />
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
