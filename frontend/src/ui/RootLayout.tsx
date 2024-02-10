import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Header from "./Header";

const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 1fr;
  width: 100%;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Main = styled.main`
  padding: 3.2rem 4.8rem;
  width: 95%;
  margin: 0 auto;
`;

export default function RootLayout() {
  return (
    <StyledRootLayout>
      <Sidebar />

      <Container>
        <Header />

        <Main>
          <Outlet />
        </Main>
      </Container>
    </StyledRootLayout>
  );
}
