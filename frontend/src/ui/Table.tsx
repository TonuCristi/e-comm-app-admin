import styled from "styled-components";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StyledTable = styled.div`
  border: 3px solid var(--color-indigo-300);
  border-radius: 1.1rem;
  margin-bottom: 2.4rem;
`;

export default function Table({ children }: Props) {
  return <StyledTable>{children}</StyledTable>;
}
