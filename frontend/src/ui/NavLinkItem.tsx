import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  to?: string;
};

type LinkProps = {
  $isActive: boolean;
};

const StyledNavLinkItem = styled.li`
  border-radius: 2.7rem 0 0 2.7rem;
  overflow: hidden;
`;

const Link = styled(NavLink)`
  text-decoration: none;
`;

const Container = styled.div<LinkProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;
  color: var(--color-indigo-50);
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-indigo-700)" : "transparent"};
  transition: all 0.15s;

  &:hover {
    background-color: var(--color-indigo-700);
  }
`;

export default function NavLinkItem({ children, to = "" }: Props) {
  return (
    <StyledNavLinkItem>
      <Link to={`/${to}`}>
        {({ isActive }: { isActive: boolean }) => (
          <Container $isActive={isActive}>{children}</Container>
        )}
      </Link>
    </StyledNavLinkItem>
  );
}
