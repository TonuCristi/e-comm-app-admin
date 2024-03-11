import styled from "styled-components";
import {
  HiCheckCircle,
  HiHomeModern,
  HiMiniChartPie,
  HiMiniCog6Tooth,
} from "react-icons/hi2";

import NavLinkItem from "./NavLinkItem";

const StyledNavLinks = styled.nav``;

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2rem;
  /* margin-left: 3.2rem; */

  /*@media (max-width: 1535px) {
    margin-left: 2.8rem;
  } */
`;

const DashboardIcon = styled(HiMiniChartPie)`
  font-size: 2rem;
`;

const ProductsIcon = styled(HiHomeModern)`
  font-size: 2rem;
`;

const OrdersIcon = styled(HiCheckCircle)`
  font-size: 2rem;
`;

const SettingsIcon = styled(HiMiniCog6Tooth)`
  font-size: 2rem;
`;

export default function NavLinks() {
  return (
    <StyledNavLinks>
      <LinksList>
        <NavLinkItem>
          <DashboardIcon />
          Dashboard
        </NavLinkItem>

        <NavLinkItem to="buildings">
          <ProductsIcon />
          Buildings
        </NavLinkItem>

        <NavLinkItem to="orders">
          <OrdersIcon />
          Orders
        </NavLinkItem>

        <NavLinkItem to="settings">
          <SettingsIcon />
          Settings
        </NavLinkItem>
      </LinksList>
    </StyledNavLinks>
  );
}
