import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar/sidebar";

export const Route = createRootRoute({
  component: Layout
})

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
