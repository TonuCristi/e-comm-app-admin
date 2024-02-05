import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";

const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem auto;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Main = styled.main``;

export default function RootLayout() {
  return (
    <StyledRootLayout>
      <Sidebar />

      <Main>
        <Outlet />
      </Main>
    </StyledRootLayout>
  );
}
