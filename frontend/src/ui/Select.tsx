import { ChangeEvent, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  defaultValue: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
};

const StyledSelect = styled.select`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem;
  outline: none;
  color: var(--color-indigo-50);
  border: 3px solid var(--color-indigo-50);
  background: none;
  border-radius: 1.1rem;
  text-transform: capitalize;

  & option {
    color: var(--color-indigo-900);
    padding: 1.2rem;
  }

  @media (max-width: 1535px) {
    font-size: 1.4rem;
    padding: 1rem;
  }
`;

export default function Select({ defaultValue, onChange, children }: Props) {
  return (
    <StyledSelect defaultValue={defaultValue} onChange={onChange}>
      {children}
    </StyledSelect>
  );
}
