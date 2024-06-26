import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

import Field from "../../ui/Field";
import Button from "../../ui/Button";
import EditBuildingButton from "./EditBuildingButton";
import ConfirmationModal from "../../ui/ConfirmationModal";
import RemoveIcon from "../../ui/RemoveIcon";
import ToPathIcon from "../../ui/ToPathIcon";

import { Building, BuildingRequest, Role, User } from "../../lib/types";
import { capitalize } from "../../utils/capitalize";

const StyledTableRow = styled.div<{ $role: Role }>`
  display: grid;
  grid-template-columns: 5fr 25fr 15fr 15fr 10fr 10fr ${(props) =>
      props.$role !== "employee" ? "5fr 5fr 5fr" : "5fr"};
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
  user: User;
};

export default function TableRow({
  nr,
  building,
  onBuildingDelete,
  onBuildingUpdate,
  user,
}: Props) {
  const { id, type, selling_price, location, discount_value } = building;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTableRow $role={user.role}>
      <Field>{nr}</Field>
      <Field>{id}</Field>
      <Field>{capitalize(type)}</Field>

      <Field>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(selling_price)}
      </Field>

      <Field>
        {+discount_value > 0 ? (
          <Discount>{discount_value} %</Discount>
        ) : (
          `${discount_value} %`
        )}
      </Field>

      <Field>{capitalize(location)}</Field>

      {user.role !== "employee" && (
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
      )}

      {user.role !== "employee" && (
        <Field>
          <Wrapper>
            <EditBuildingButton
              id={id}
              onUpdate={onBuildingUpdate}
              building={building}
            />
          </Wrapper>
        </Field>
      )}

      <Field>
        <Wrapper>
          <BuldingLink to={`/buildings/${id}`}>
            <ToPathIcon />
          </BuldingLink>
        </Wrapper>
      </Field>
    </StyledTableRow>
  );
}
