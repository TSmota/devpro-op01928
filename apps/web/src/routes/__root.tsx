import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar/sidebar";
import { ForecastProvider } from "../context/forecast-context";

export const Route = createRootRoute({
  component: Layout
})

function Layout() {
  return (
    <div className="app-layout">
      <ForecastProvider>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </ForecastProvider>
    </div>
  )
}
