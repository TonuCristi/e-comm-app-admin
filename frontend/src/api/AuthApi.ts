import { AxiosResponse } from "axios";
import api from "../config/api";
import {
  Token,
  UserRequest,
  UserRequestLogin,
  UserResponse,
} from "../lib/types";

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
  changePass(id: string) {
    return api
      .post(`users/changePass/${id}`)
      .then(({ data }: AxiosResponse<string>) => data);
  },
  deleteUser(id: string) {
    return api
      .delete(`/users/${id}`)
      .then(({ data }: AxiosResponse<UserResponse[]>) => data);
  },
};

export default AuthApi;
