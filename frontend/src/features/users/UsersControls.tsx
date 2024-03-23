import { ReactNode } from "react";
import styled from "styled-components";

const StyledUsersControls = styled.div`
  margin-bottom: 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  children: ReactNode;
};

export default function UsersControls({ children }: Props) {
  return <StyledUsersControls>{children}</StyledUsersControls>;
}
