import styled from "styled-components";

import TableHeader from "../../ui/TableHeader";
import TableRow from "./TableRow";

import { BuildingWithId } from "../../context/BuildingsContext";

type Props = {
  buildings: BuildingWithId[];
  onBuildingDelete: (id: string) => void;
  buildingsPerPage: number;
  pageNr: number;
};

const fields = [
  "Nr.",
  "Id",
  "Type",
  "Selling Price",
  "Total area",
  "Location",
  "",
];

const StyledBuildingsTable = styled.div`
  border: 3px solid var(--color-indigo-300);
  border-radius: 1.1rem;
  margin-bottom: 2.4rem;
`;

export default function Table({
  buildings,
  onBuildingDelete,
  buildingsPerPage,
  pageNr,
}: Props) {
  return (
    <StyledBuildingsTable>
      <TableHeader variant="buildings" fields={fields} />
      {buildings.map((building: BuildingWithId, i: number) => (
        <TableRow
          key={building._id}
          nr={pageNr * buildingsPerPage + i + 1}
          building={building}
          onDelete={onBuildingDelete}
        />
      ))}
    </StyledBuildingsTable>
  );
}
