import styled from "styled-components";
import { HiArrowSmallRight, HiMiniXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import Field from "../../ui/Field";
import Button from "../../ui/Button";

import EditBuildingButton from "./EditBuildingButton";
import { Building, BuildingWithoutId } from "../../lib/types";

type Props = {
  nr: number;
  building: Building;
  onBuildingDelete: (id: string) => void;
  onBuildingUpdate: (id: string, building: BuildingWithoutId) => void;
};

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 25fr 10fr 15fr 10fr 10fr 10fr 5fr 5fr 5fr;
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

const Discount = styled.div`
  background-color: var(--color-red-500);
  padding: 0.4rem;
  font-weight: 600;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
`;

export default function TableRow({
  nr,
  building,
  onBuildingDelete,
  onBuildingUpdate,
}: Props) {
  const { _id, type, selling_price, square_meters, location, discount_value } =
    building;

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
        {+discount_value > 0 ? (
          <Discount>{discount_value} %</Discount>
        ) : (
          `${discount_value} %`
        )}
      </Field>

      <Field>
        {square_meters} m<sup>2</sup>
      </Field>

      <Field>{location.slice(0, 1).toUpperCase() + location.slice(1)}</Field>

      <Field>
        <Wrapper>
          <Button onClick={() => onBuildingDelete(_id)} variant="operation">
            <RemoveIcon />
          </Button>
        </Wrapper>
      </Field>

      <Field>
        <Wrapper>
          <EditBuildingButton
            id={_id}
            onUpdate={onBuildingUpdate}
            building={building}
          />
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
