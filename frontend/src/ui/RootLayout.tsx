import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Header from "./Header";

const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  padding: 3.2rem 4.8rem;
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
`;

export default function RootLayout() {
  return (
    <StyledRootLayout>
      <Sidebar />

      <Container>
        <Wrapper>
          <Header />

          <Main>
            <Outlet />
          </Main>
        </Wrapper>
      </Container>
    </StyledRootLayout>
  );
}
