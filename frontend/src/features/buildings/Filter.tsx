import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  filters: object[];
  filter: string;
};

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterName = styled.div``;

const Select = styled.select`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem;
  outline: none;
  color: var(--color-indigo-50);
  border: 3px solid var(--color-indigo-50);
  background: none;
  border-radius: 1.1rem;
  text-transform: capitalize;

  & option {
    color: var(--color-indigo-900);
    padding: 1.2rem;
  }
`;

export default function Filter({ filters, filter }: Props) {
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
      <Select defaultValue="ascending" onChange={handleChange}>
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
