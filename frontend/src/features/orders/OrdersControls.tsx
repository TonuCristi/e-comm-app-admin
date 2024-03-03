import { ReactNode } from "react";
import styled from "styled-components";

const StyledOrdersControls = styled.div`
  margin-bottom: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  children: ReactNode;
};

export default function OrdersControls({ children }: Props) {
  return <StyledOrdersControls>{children}</StyledOrdersControls>;
}
