import styled from "styled-components";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";

import NavLinks from "./NavLinks";
import Title from "./Title";
import Button from "./Button";

const StyledSidebar = styled.aside`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-indigo-900);
  padding: 3.2rem 0;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`;

const Icon = styled(HiMiniArrowRightOnRectangle)`
  stroke-width: 0.5;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Title />

      <NavLinks />

      <ButtonWrapper>
        <Button variant="regular">
          <Icon />
          Logout
        </Button>
      </ButtonWrapper>
    </StyledSidebar>
  );
}
