import { Input } from "../input/input";

import './search.css'

export function Search() {
  return (
    <section className="c-search">
      <h3 className="c-search__title">Search</h3>
      <Input type="text" placeholder="Search by city" />
    </section>
  )
}
