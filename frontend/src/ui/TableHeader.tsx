import styled, { css } from "styled-components";

import Field from "./Field";

type Props = {
  fields: string[];
  variant: "buildings";
};

type VariantProps = {
  $variant: "buildings";
};

const variants = {
  buildings: css`
    grid-template-columns: 5fr 25fr 15fr 15fr 15fr 15fr 5fr 5fr;
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
