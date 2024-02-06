import styled from "styled-components";

import Loader from "../../ui/Loader";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

import { useBuildings } from "./useBuildings";

export interface Building {
  _id: string;
  type: string;
  location: string;
  selling_price: number;
  address: string;
  description: string;
  discount_value: number;
  nr_balconies: number;
  nr_bathrooms: number;
  nr_floors: number;
  nr_garages: number;
  nr_rooms: number;
  original_price: number;
  square_meters: number;
}

const fields = [
  "Nr.",
  "Type",
  "Selling Price",
  "Total area",
  "Location",
  "Address",
];

const StyledBuildingsTable = styled.div`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  border: 3px solid var(--color-indigo-50);
  border-radius: 1.1rem;
`;

export default function BuildingsTable() {
  const { buildings, isLoading, error } = useBuildings();

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
