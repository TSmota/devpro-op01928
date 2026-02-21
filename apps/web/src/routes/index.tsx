import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <section className="p-1 gradient-background text-center h-full text-white">
      <h1>Weather forecast</h1>

      <p>Search for your city to get the latest weather information.</p>
    </section>
  )
}
