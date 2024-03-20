import { ReactNode } from "react";
import styled from "styled-components";

const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

type Props = {
  children: ReactNode;
};

export default function LoaderWrapper({ children }: Props) {
  return <StyledLoaderWrapper>{children}</StyledLoaderWrapper>;
}
