import styled from "styled-components";
import { HiArrowSmallRight, HiMiniXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import Field from "../../ui/Field";
import Button from "../../ui/Button";

import EditBuildingButton from "./EditBuildingButton";
import { Building, BuildingRequest } from "../../lib/types";
import { capitalize } from "../../utils/capitalize";
import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../ui/ConfirmationModal";

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

type Props = {
  nr: number;
  building: Building;
  onBuildingDelete: (id: string) => void;
  onBuildingUpdate: (id: string, building: BuildingRequest) => void;
};

export default function TableRow({
  nr,
  building,
  onBuildingDelete,
  onBuildingUpdate,
}: Props) {
  const { id, type, selling_price, area, location, discount_value } = building;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTableRow>
      <Field>{nr}</Field>
      <Field>{id}</Field>
      <Field>{capitalize(type)}</Field>

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
        {area} m<sup>2</sup>
      </Field>

      <Field>{capitalize(location)}</Field>

      <Field>
        <Wrapper>
          <Button onClick={() => setIsOpen(true)} variant="operation">
            <RemoveIcon />
          </Button>
          {isOpen &&
            createPortal(
              <ConfirmationModal
                onClick={() => onBuildingDelete(id)}
                setIsOpen={setIsOpen}
              />,
              document.body
            )}
        </Wrapper>
      </Field>

      <Field>
        <Wrapper>
          <EditBuildingButton
            id={id}
            onUpdate={onBuildingUpdate}
            building={building}
          />
        </Wrapper>
      </Field>

      <Field>
        <Wrapper>
          <BuldingLink to={`/buildings/${id}`}>
            <ToBuildingIcon />
          </BuldingLink>
        </Wrapper>
      </Field>
    </StyledTableRow>
  );
}
