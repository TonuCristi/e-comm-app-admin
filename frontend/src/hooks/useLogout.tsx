import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext";

export function useLogout() {
  const { setCurrentUser } = useContext(GlobalContext);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setCurrentUser({
      username: "",
      email: "",
      role: "customer",
      createdAt: "",
    });
    navigate("/");
  }

  return { logout };
}
