import { ChangeEvent, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Select from "./Select";

import { Building } from "../lib/types";

type Filter = "location" | "type";

type Props = {
  defaultValue: string;
  filter: Filter;
  value: string | null;
  buildings: Building[];
};

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterName = styled.div`
  font-weight: 500;
`;

export default function Filter({
  filter,
  defaultValue,
  buildings,
  value,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useCallback(
    (field: Filter) =>
      buildings
        ?.map((building: Building) => building[field].toLowerCase())
        .filter(
          (item: string, i: number, arr: string[]) => arr.indexOf(item) === i
        )
        .map((item: string) => {
          return { [item.toLowerCase()]: item };
        }),
    [buildings]
  );

  const filterTypes = filters(filter)
    ? [{ [defaultValue.toLowerCase()]: defaultValue }, ...filters(filter)]
    : null;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set(filter, e.target.value);
    setSearchParams(searchParams);

    if (
      searchParams.get(filter)?.toLowerCase() === defaultValue.toLowerCase()
    ) {
      searchParams.delete(filter);
      setSearchParams(searchParams);
    }
  }

  return (
    <StyledFilter>
      <FilterName>
        {filter.slice(0, 1).toUpperCase() + filter.slice(1)}:
      </FilterName>
      <Select
        key={searchParams.get(filter)}
        defaultValue={value ?? defaultValue}
        onChange={handleChange}
      >
        {filterTypes?.map((type) => {
          const [key, value] = Object.entries(type)[0];
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </Select>
    </StyledFilter>
  );
}
