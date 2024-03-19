import styled, { css } from "styled-components";

import { ReactNode } from "react";

type Variant = "buildings" | "orders" | "users";
type Props = {
  children: ReactNode;
  variant: Variant;
};

type VariantProps = {
  $variant: Variant;
};

const variants = {
  buildings: css`
    border: 3px solid var(--color-indigo-300);
    border-radius: 1.1rem;
    margin-bottom: 2.4rem;
  `,
  orders: css`
    border: 3px solid var(--color-indigo-300);
    border-radius: 1.1rem;
    margin-bottom: 2.4rem;
  `,
  users: css`
    border: 3px solid var(--color-indigo-300);
    border-radius: 1.1rem;
    margin-bottom: 2.4rem;
  `,
};

const StyledTable = styled.div<VariantProps>`
  ${(props) => variants[props.$variant]}
`;

export default function Table({ children, variant }: Props) {
  return <StyledTable $variant={variant}>{children}</StyledTable>;
}
