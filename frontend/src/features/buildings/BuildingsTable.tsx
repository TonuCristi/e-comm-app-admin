import styled from "styled-components";

import Loader from "../../ui/Loader";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

import { Building } from "../../pages/Buildings";

type Props = {
  buildings: Building[];
  isLoading: boolean;
  error: Error | null;
};

const fields = [
  "Nr.",
  "Type",
  "Selling Price",
  "Total area",
  "Location",
  "Address",
  "",
];

const StyledBuildingsTable = styled.div`
  border: 3px solid var(--color-indigo-50);
  border-radius: 1.1rem;
`;

export default function BuildingsTable({ buildings, isLoading, error }: Props) {
  if (isLoading) return <Loader />;

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledBuildingsTable>
      <TableHeader fields={fields} />
      {buildings.map((building: Building, i: number) => (
        <TableRow key={building._id} nr={i + 1} building={building} />
      ))}
    </StyledBuildingsTable>
  );
}
