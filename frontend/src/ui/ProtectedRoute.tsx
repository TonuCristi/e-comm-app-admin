import { useContext, useEffect } from "react";

import RootLayout from "./RootLayout";
import Authentication from "../pages/Authentication";
import GlobalContext from "../context/GlobalContext";

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
    <GlobalContext>
      <RootLayout />
    </GlobalContext>
  ) : (
    <Authentication />
  );
}
