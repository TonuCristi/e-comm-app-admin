import { AxiosResponse } from "axios";
import api from "../config/api";
import { UserRequest, UserRequestLogin, UserResponse } from "../lib/types";

const UserApi = {
  signupUser(user: UserRequest) {
    return api
      .post("/signup", user)
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
  loginUser(user: UserRequestLogin) {
    return api
      .post("/login", user)
      .then(({ data }: AxiosResponse<UserResponse>) => data);
  },
};

export default UserApi;
