import styled, { css } from "styled-components";

import Field from "./Field";

type Variant = "buildings" | "orders";

type Props = {
  fields: string[];
  variant: Variant;
};

type VariantProps = {
  $variant: Variant;
};

const variants = {
  buildings: css`
    grid-template-columns: 5fr 25fr 10fr 15fr 10fr 10fr 10fr 5fr 5fr 5fr;
  `,
  orders: css`
    grid-template-columns: 5fr 25fr 15fr 15fr 15fr 15fr 10fr;
  `,
};

const StyledTableHeader = styled.div<VariantProps>`
  display: grid;
  border-bottom: 3px solid var(--color-indigo-300);

  ${(props) => variants[props.$variant]}
`;

export default function TableHeader({ fields, variant }: Props) {
  return (
    <StyledTableHeader $variant={variant}>
      {fields.map((field) => (
        <Field key={field}>{field}</Field>
      ))}
    </StyledTableHeader>
  );
}
