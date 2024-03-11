import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import Select from "../../ui/Select";

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const FilterName = styled.div`
  font-weight: 500;

  @media (max-width: 1535px) {
    font-size: 1.4rem;
  }
`;

type Props = {
  setPageNr: Dispatch<SetStateAction<number>>;
};

export default function Filter({ setPageNr }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setPageNr(0);

    if (e.target.value === "processing") {
      searchParams.delete("status");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      <FilterName>Status: </FilterName>
      <Select
        defaultValue={searchParams.get("status") ? "paid" : "processing"}
        onChange={handleChange}
      >
        <option value="processing">Processing</option>
        <option value="paid">Paid</option>
      </Select>
    </StyledFilter>
  );
}
