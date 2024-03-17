import { ReactNode } from "react";
import styled, { css } from "styled-components";

type Variant = "regular" | "operation" | "auth";

type Props = {
  children: ReactNode;
  variant: Variant;
  disabled?: boolean;
  onClick?: () => void;
};

type VariantProps = { $variant: Variant };

const variants = {
  regular: css`
    background-color: var(--color-indigo-50);
    color: var(--color-indigo-700);
    padding: 1rem 2.4rem;
    border-radius: 0.7rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-indigo-100);
      color: var(--color-indigo-900);
    }
  `,
  operation: css`
    background-color: var(--color-indigo-50);
    color: var(--color-indigo-700);
    border-radius: 100%;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  auth: css`
    background-color: var(--color-indigo-50);
    color: var(--color-indigo-700);
    padding: 1rem 2.4rem;
    border-radius: 0.7rem;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-indigo-100);
      color: var(--color-indigo-900);
    }

    &:disabled {
      background-color: var(--color-indigo-100);
      color: var(--color-indigo-900);
    }
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

export default function Button({
  children,
  variant,
  disabled,
  onClick,
}: Props) {
  return (
    <StyledButton onClick={onClick} $variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
