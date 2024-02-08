import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  sortTypes: object[];
};

const Select = styled.select`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem;
  outline: none;
  color: var(--color-indigo-50);
  border: 3px solid var(--color-indigo-50);
  background: none;
  border-radius: 1.1rem;

  & option {
    color: var(--color-indigo-900);
    padding: 1.2rem;
  }
`;

export default function Sort({ sortTypes }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select defaultValue="ascending" onChange={handleChange}>
      {sortTypes.map((type) => {
        const [key, value] = Object.entries(type)[0];
        return (
          <option key={key} value={key}>
            {value}
          </option>
        );
      })}
    </Select>
  );
}
