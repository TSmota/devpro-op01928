import { Search } from "../search/search";

import "./sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <Search />
      <p className="sidebar__disclaimer">
        The information provided by this weather application is for general informational purposes only. All weather data,
        forecasts, and alerts are obtained from third-party sources and are provided “as is” without warranty of any kind,
        either express or implied. While we strive to provide accurate and timely information, we make no representations
        or warranties of any kind regarding the accuracy, completeness, reliability, or suitability of the weather data
        presented.
      </p>
    </aside>
  )
}
