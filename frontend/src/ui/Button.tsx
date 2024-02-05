import { ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  children: ReactNode;
  variant: "regular";
};

type VariantProps = { $variant: "regular" };

const variants = {
  regular: css`
    background-color: var(--color-indigo-50);
    color: var(--color-indigo-700);
    padding: 1rem 2.4rem;
    border-radius: 0.7rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  `,
};

const StyledButton = styled.button<VariantProps>`
  border: none;
  background: none;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  cursor: pointer;

  ${(props) => variants[props.$variant]}
`;

export default function Button({ children, variant }: Props) {
  return <StyledButton $variant={variant}>{children}</StyledButton>;
}
