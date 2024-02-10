import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Avatar from "./Avatar";

const StyledHeader = styled.header`
  padding: 3.2rem 4.8rem 0;
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
