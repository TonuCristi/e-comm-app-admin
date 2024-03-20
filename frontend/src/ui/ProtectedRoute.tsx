import { useContext, useEffect } from "react";

import RootLayout from "./RootLayout";
import Authentication from "../pages/Authentication";
import GlobalProvider from "../context/GlobalContext";
import BuildingsProvider from "../context/BuildingsContext";

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && location.pathname !== "/") navigate("/", { replace: true });
  }, [navigate, location.pathname, token]);

  return token ? (
    <GlobalProvider>
      <BuildingsProvider>
        <RootLayout />
      </BuildingsProvider>
    </GlobalProvider>
  ) : (
    <Authentication />
  );
}
