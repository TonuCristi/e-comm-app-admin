import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export function useLogout() {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    setCurrentUser({
      username: "",
      email: "",
      role: "customer",
      token: "",
      createdAt: "",
    });
    navigate("/auth");
  }

  return { logout };
}
