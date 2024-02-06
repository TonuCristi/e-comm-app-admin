import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Avatar from "./Avatar";

const StyledHeader = styled.header`
  margin-bottom: 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrentPage = styled.h2`
  text-transform: capitalize;
`;

export default function Header() {
  const location = useLocation();
  const currentRoute = location.pathname.split("/")[1];

  return (
    <StyledHeader>
      <CurrentPage>
        {location.pathname === "/" ? "Dashboard" : currentRoute}
      </CurrentPage>

      <Avatar />
    </StyledHeader>
  );
}
