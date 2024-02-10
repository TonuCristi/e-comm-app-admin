import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Select from "./Select";

type Props = {
  filters: object[];
  filter: string;
  defaultValue: string;
};

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterName = styled.div``;

export default function Filter({ filters, filter, defaultValue }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterTypes = filters ? [{ all: "All" }, ...filters] : null;

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set(filter, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      <FilterName>
        {filter.slice(0, 1).toUpperCase() + filter.slice(1)}:
      </FilterName>
      <Select defaultValue={defaultValue} onChange={handleChange}>
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
