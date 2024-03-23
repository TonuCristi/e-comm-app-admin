import styled from "styled-components";
import { User } from "../../lib/types";
import { capitalize } from "../../utils/capitalize";
import Select from "../../ui/Select";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent } from "react";

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
  users: User[];
};

export default function Filter({ users }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const roles = [
    "all",
    ...users
      .map((user) => user.role)
      .filter((role, i, roles) => roles.indexOf(role) === i),
  ];

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "all") {
      searchParams.delete("role");
      return setSearchParams(searchParams);
    }

    searchParams.set("role", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      <FilterName>Role:</FilterName>
      <Select
        defaultValue={searchParams.get("role") ?? "all"}
        onChange={handleChange}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {capitalize(role)}
          </option>
        ))}
      </Select>
    </StyledFilter>
  );
}
