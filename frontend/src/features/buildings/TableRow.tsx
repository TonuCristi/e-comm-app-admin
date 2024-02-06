import styled from "styled-components";

import Field from "./Field";

import { Building } from "./BuildingsTable";

type Props = {
  nr: number;
  building: Building;
};

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 15fr 20fr 15fr 20fr 25fr;
  border-bottom: 3px solid var(--color-indigo-50);

  &:last-child {
    border-bottom: none;
  }
`;

export default function TableRow({ nr, building }: Props) {
  const { type, selling_price, square_meters, location, address } = building;

  return (
    <StyledTableRow>
      <Field>{nr}</Field>
      <Field>{type.slice(0, 1).toUpperCase() + type.slice(1)}</Field>
      <Field>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(selling_price)}
      </Field>
      <Field>
        {square_meters} m<sup>2</sup>
      </Field>
      <Field>{location}</Field>
      <Field>{address}</Field>
    </StyledTableRow>
  );
}
