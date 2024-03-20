import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { GlobalContext } from "../context/GlobalContext";
import AuthApi from "../api/AuthApi";
import { UserResponse } from "../lib/types";

const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  height: 100%;
  padding: 3.2rem 4.8rem;
  width: 100%;
`;

export default function RootLayout() {
  const { setIsLoading, error, setError, currentUser, setCurrentUser } =
    useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const mapUser = (user: UserResponse) => {
    const { _id: id, ...rest } = user;
    return {
      id,
      ...rest,
    };
  };

  useEffect(() => {
    setIsLoading(true);
    AuthApi.getUser()
      .then((data) => {
        const user = mapUser(data);

        setCurrentUser(user);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [setCurrentUser, setIsLoading, setError]);

  useEffect(() => {
    const path = location.pathname.split("/")[1];

    if (currentUser.role === "employee" && path === "users") {
      navigate("/");
    }
  }, [currentUser.role, location, navigate]);

  if (error) return <div>Something went wrong...</div>;

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
