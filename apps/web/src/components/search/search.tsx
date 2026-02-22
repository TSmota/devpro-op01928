import type { ChangeEvent } from "react";
import { useEffect, useMemo } from "react";
import { debounce } from "@repo/utils";

import { Input } from "../input/input";

import './search.css';

interface ISearchProps {
  disabled?: boolean;
  onSearch?: (query: string) => void;
}

export function Search(props: ISearchProps) {
  const { disabled, onSearch } = props

  const debounced = useMemo(() => {
    return debounce((value: string) => {
      if (onSearch) {
        onSearch(value)
      }
    }, 500)
  }, [onSearch])

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [debounced])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounced(event.target.value)
  }

  return (
    <section className="c-search">
      <h3 className="c-search__title">Search</h3>
      <Input disabled={disabled} type="text" placeholder="Search by city" onChange={onChange} />
    </section>
  )
}
