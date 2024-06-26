import styled from "styled-components";
import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

import Field from "../../ui/Field";
import Button from "../../ui/Button";
import ConfirmationModal from "../../ui/ConfirmationModal";
import RemoveIcon from "../../ui/RemoveIcon";
import ToPathIcon from "../../ui/ToPathIcon";

import { Order, Role, User } from "../../lib/types";
import { capitalize } from "../../utils/capitalize";

const StyledTabelRow = styled.div<{ role: Role }>`
  display: grid;
  grid-template-columns: 5fr 30fr 13fr 14fr 15fr 13fr ${(props) =>
      props.role !== "employee" ? "5fr 5fr" : "5fr"};
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

const OrderLink = styled(NavLink)`
  text-decoration: none;
  background-color: var(--color-indigo-50);
  color: var(--color-indigo-700);
  border-radius: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  nr: number;
  order: Order;
  onOrderDelete: (id: string) => void;
  user: User;
};

export default function TableRow({ nr, order, onOrderDelete, user }: Props) {
  const { id, type, location, selling_price, paid } = order;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTabelRow role={user.role}>
      <Field>{nr}</Field>
      <Field>{id}</Field>
      <Field>{capitalize(type)}</Field>
      <Field>{capitalize(location)}</Field>
      <Field>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(selling_price)}
      </Field>
      <Field>{paid ? "paid" : "processing"}</Field>

      {user.role !== "employee" && (
        <Field>
          <Wrapper>
            <Button variant="operation" onClick={() => setIsOpen(true)}>
              <RemoveIcon />
            </Button>
            {isOpen &&
              createPortal(
                <ConfirmationModal
                  onClick={() => onOrderDelete(id)}
                  setIsOpen={setIsOpen}
                />,
                document.body
              )}
          </Wrapper>
        </Field>
      )}

      <Field>
        <Wrapper>
          <Button variant="operation">
            <OrderLink to={`/orders/${id}`}>
              <ToPathIcon />
            </OrderLink>
          </Button>
        </Wrapper>
      </Field>
    </StyledTabelRow>
  );
}
