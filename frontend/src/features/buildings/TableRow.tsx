import styled from "styled-components";
import { HiArrowSmallRight, HiMiniXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import Field from "../../ui/Field";
import Button from "../../ui/Button";

import { BuildingWithId } from "../../context/BuildingsContext";

type Props = {
  nr: number;
  building: BuildingWithId;
  onDelete: (id: string) => void;
};

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 25fr 15fr 15fr 15fr 15fr 5fr 5fr;
  border-bottom: 3px solid var(--color-indigo-300);

  &:last-child {
    border-bottom: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveIcon = styled(HiMiniXMark)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

const BuldingLink = styled(NavLink)`
  text-decoration: none;
  background-color: var(--color-indigo-50);
  color: var(--color-indigo-700);
  border-radius: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToBuildingIcon = styled(HiArrowSmallRight)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

export default function TableRow({ nr, building, onDelete }: Props) {
  const { _id, type, selling_price, square_meters, location } = building;

  return (
    <StyledTableRow>
      <Field>{nr}</Field>
      <Field>{_id}</Field>
      <Field>{type.slice(0, 1).toUpperCase() + type.slice(1)}</Field>
      <Field>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(+selling_price)}
      </Field>
      <Field>
        {square_meters} m<sup>2</sup>
      </Field>
      <Field>{location}</Field>
      <Field>
        <Wrapper>
          <Button onClick={() => onDelete(_id)} variant="operation">
            <RemoveIcon />
          </Button>
        </Wrapper>
      </Field>
      <Field>
        <Wrapper>
          <BuldingLink to={`/buildings/${_id}`}>
            <ToBuildingIcon />
          </BuldingLink>
        </Wrapper>
      </Field>
    </StyledTableRow>
  );
}
