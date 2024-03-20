import { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../features/users/TableRow";
import Loader from "../ui/Loader";
import LoaderWrapper from "../ui/LoaderWrapper";
import { GlobalContext } from "../context/GlobalContext";

import { User, UserResponse } from "../lib/types";
import AuthApi from "../api/AuthApi";

const fields = ["Nr", "Id", "Username", "Email", "Role", "Joined", ""];

const StyledUsers = styled.div``;

type State = {
  isLoading: boolean;
  error: string;
  users: User[];
};

type Action =
  | { type: "fetchUsers"; payload: User[] }
  | { type: "fetchError"; payload: string };

const initialState: State = {
  isLoading: true,
  error: "",
  users: [],
};

function usersReducer(state: State, action: Action) {
  switch (action.type) {
    case "fetchUsers":
      return {
        isLoading: false,
        error: "",
        users: action.payload,
      };

    case "fetchError":
      return {
        isLoading: false,
        error: action.payload,
        users: [],
      };

    default:
      throw new Error("Unknown action!");
  }
}

export default function Users() {
  const { currentUser } = useContext(GlobalContext);
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const { isLoading, error, users } = state;

  const mapUsers = (users: UserResponse[]) => {
    return users.map((user: UserResponse) => {
      const { _id: id, ...rest } = user;
      return { id, ...rest };
    });
  };

  useEffect(() => {
    AuthApi.getUsers()
      .then((res) => {
        const users = mapUsers(res);
        dispatch({ type: "fetchUsers", payload: users });
      })
      .catch((err) => dispatch({ type: "fetchError", payload: err.message }));
  }, [dispatch]);

  function handleDelete(id: string) {
    AuthApi.deleteUser(id)
      .then((res) => {
        const users = mapUsers(res);
        dispatch({ type: "fetchUsers", payload: users });
      })
      .catch((err) => dispatch({ type: "fetchError", payload: err.message }));
  }

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledUsers>
      <Table variant="users">
        <TableHeader variant="users" fields={fields} />
        {users
          .filter((user) => user.id !== currentUser.id)
          .map((user, i) => (
            <TableRow
              key={user.id}
              nr={i + 1}
              user={user}
              onUserDelete={handleDelete}
            />
          ))}
      </Table>
    </StyledUsers>
  );
}
