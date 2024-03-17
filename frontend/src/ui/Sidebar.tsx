import styled from "styled-components";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";

import NavLinks from "./NavLinks";
import Title from "./Title";
import Button from "./Button";

import { useLogout } from "../hooks/useLogout";

const StyledSidebar = styled.aside`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-indigo-900);
  padding: 2.4rem 0 2.4rem 2.8rem;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: 0 2.4rem 0 0;
`;

const Icon = styled(HiMiniArrowRightOnRectangle)`
  stroke-width: 0.5;
`;

export default function Sidebar() {
  const { logout } = useLogout();

  return (
    <StyledSidebar>
      <Title />

      <NavLinks />

      <ButtonWrapper>
        <Button variant="regular" onClick={logout}>
          <Icon />
          Logout
        </Button>
      </ButtonWrapper>
    </StyledSidebar>
  );
}
