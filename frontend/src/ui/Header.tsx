import { useContext } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

import Avatar from "./Avatar";

import { GlobalContext } from "../context/GlobalContext";
import { HiMiniCog6Tooth } from "react-icons/hi2";

const StyledHeader = styled.header`
  padding: 3.2rem 4.8rem 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 2.4rem;
`;

const CurrentPage = styled.h2`
  text-transform: capitalize;
`;

const SettingsIcon = styled(HiMiniCog6Tooth)`
  font-size: 2.4rem;
  color: var(--color-indigo-50);
`;

const SettingsLink = styled(NavLink)``;

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

export default function Header() {
  const { currentUser } = useContext(GlobalContext);
  const location = useLocation();
  const currentRoute = location.pathname.split("/")[1];

  return (
    <StyledHeader>
      <CurrentPage>
        {location.pathname === "/" ? "Dashboard" : currentRoute}
      </CurrentPage>

      <Wrapper>
        {currentUser.username && <Avatar username={currentUser.username} />}

        <SettingsLink to="settings">
          <SettingsIcon />
        </SettingsLink>
      </Wrapper>
    </StyledHeader>
  );
}
