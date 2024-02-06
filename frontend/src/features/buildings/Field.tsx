import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const StyledField = styled.div`
  border-right: 3px solid var(--color-indigo-50);
  padding: 0.8rem;

  &:last-child {
    border-right: none;
  }
`;

export default function Field({ children }: Props) {
  return <StyledField>{children}</StyledField>;
}
