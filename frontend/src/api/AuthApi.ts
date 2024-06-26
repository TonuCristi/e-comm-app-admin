import { AxiosResponse } from "axios";
import api from "../config/api";
import {
  Token,
  UserRequest,
  UserRequestLogin,
  UserResponse,
} from "../lib/types";
import { ChangePass } from "../pages/Settings";

const AuthApi = {
  signupUser(user: UserRequest) {
    return api
      .post("/users/signup", user)
      .then(({ data }: AxiosResponse<Token>) => data.token);
  },
  loginUser(user: UserRequestLogin) {
    return api
      .post("/users/login", user)
      .then(({ data }: AxiosResponse<Token>) => data.token);
  },
  getUser() {
    return api
      .get("/users/login")
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
  getUsers() {
    return api
      .get("/users")
      .then(({ data }: AxiosResponse<UserResponse[]>) => data);
  },
  changePass(id: string, data: ChangePass) {
    return api
      .put(`users/changePass/${id}`, { ...data })
      .then(({ data }: AxiosResponse<{ message: string }>) => data);
  },
  deleteUser(id: string) {
    return api
      .delete(`/users/${id}`)
      .then(({ data }: AxiosResponse<UserResponse[]>) => data);
  },
  updateUser(id: string, user: UserRequest) {
    return api
      .put(`/users/${id}`, user)
      .then(({ data }: AxiosResponse<UserResponse[]>) => data);
  },
};

export default AuthApi;
