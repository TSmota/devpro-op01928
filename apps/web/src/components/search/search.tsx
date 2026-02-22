import { ChangeEvent, useCallback } from "react";
import { debounce } from "@repo/utils";

import { Input } from "../input/input";

import './search.css';

interface ISearchProps {
  disabled?: boolean;
  onSearch?: (query: string) => void;
}

export function Search(props: ISearchProps) {
  const { disabled, onSearch } = props

  const onChange = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value)
    }
  }, 500), [onSearch])

  return (
    <section className="c-search">
      <h3 className="c-search__title">Search</h3>
      <Input disabled={disabled} type="text" placeholder="Search by city" onChange={onChange} />
    </section>
  )
}
