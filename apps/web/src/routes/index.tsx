import { createFileRoute } from '@tanstack/react-router';
import { useForecastContext } from '../context/forecast-context';
import { Loader } from '../components/loader/loader';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { loading } = useForecastContext();

  if (loading) {
    return (
      <section className="p-1 gradient-background text-center h-full text-white">
        <Loader />
      </section>
    )
  }

  return (
    <section className="p-1 gradient-background text-center h-full text-white">
      <h1>Weather forecast</h1>

      <p>Search for your city to get the latest weather information.</p>
    </section>
  )
}
