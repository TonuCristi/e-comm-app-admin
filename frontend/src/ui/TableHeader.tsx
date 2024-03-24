import styled, { css } from "styled-components";

import Field from "./Field";

import { User } from "../lib/types";

type Variant =
  | "buildings"
  | "buildingsEmployee"
  | "orders"
  | "ordersEmployee"
  | "users";

type VariantProps = {
  $variant: Variant;
};

const variants = {
  buildings: css`
    grid-template-columns: 5fr 25fr 15fr 15fr 10fr 10fr 5fr 5fr 5fr;
  `,
  buildingsEmployee: css`
    grid-template-columns: 5fr 25fr 15fr 15fr 10fr 10fr 5fr;
  `,
  orders: css`
    grid-template-columns: 5fr 30fr 13fr 14fr 15fr 13fr 5fr 5fr;
  `,
  ordersEmployee: css`
    grid-template-columns: 5fr 30fr 13fr 14fr 15fr 13fr 5fr;
  `,
  users: css`
    grid-template-columns: 5fr 25fr 15fr 25fr 10fr 10fr 5fr 5fr;
  `,
};

const StyledTableHeader = styled.div<VariantProps>`
  display: grid;
  border-bottom: 3px solid var(--color-indigo-300);

  ${(props) => variants[props.$variant]}
`;

type Props = {
  fields: string[];
  variant: Variant;
  user?: User;
};

export default function TableHeader({ fields, variant }: Props) {
  return (
    <StyledTableHeader $variant={variant}>
      {fields.map((field) => (
        <Field key={field}>{field}</Field>
      ))}
    </StyledTableHeader>
  );
}
