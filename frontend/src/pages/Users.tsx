import { useContext, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { FieldValues, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../features/users/TableRow";
import Loader from "../ui/Loader";
import LoaderWrapper from "../ui/LoaderWrapper";
import Filter from "../features/users/Filter";
import Input from "../ui/Input";
import Search from "../ui/Search";
import UsersControls from "../features/users/UsersControls";
import Pagination from "../ui/Pagination";

import { User, UserRequest, UserResponse } from "../lib/types";
import AuthApi from "../api/AuthApi";
import { GlobalContext } from "../context/GlobalContext";

const PER_PAGE = 9;

const fields = ["Nr", "Id", "Username", "Email", "Role", "Joined", ""];

const StyledUsers = styled.div`
  @media (max-width: 1535px) {
    font-size: 1.4rem;
  }
`;

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
  const { register, reset, watch } = useForm<FieldValues>({
    defaultValues: {
      searchValue: "",
    },
  });
  const [searchParams] = useSearchParams();
  const [pageNr, setPageNr] = useState(0);

  const { isLoading, error, users } = state;

  // Role filter
  const roleFilter = searchParams.get("role")
    ? users.filter((user) => user.role === searchParams.get("role"))
    : users;

  // Search
  const allUsers = roleFilter
    .filter((user) =>
      user.id.toLowerCase().startsWith(watch("searchValue").toLowerCase())
    )
    .filter((user) => user.id !== currentUser.id);

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
        setPageNr(0);
      })
      .catch((err) => dispatch({ type: "fetchError", payload: err.message }));
  }

  function handleUpdate(id: string, user: UserRequest) {
    AuthApi.updateUser(id, user)
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
      <UsersControls>
        <Search reset={reset}>
          <Input
            variant="search"
            register={register}
            placeholder="Search by id..."
            searchField="searchValue"
          />
        </Search>

        <Filter users={users} />
      </UsersControls>

      <Table>
        <TableHeader variant="users" fields={fields} />
        {allUsers
          .slice(pageNr * PER_PAGE, PER_PAGE * (pageNr + 1))
          .map((user, i) => (
            <TableRow
              key={user.id}
              nr={pageNr * PER_PAGE + i + 1}
              user={user}
              onUserDelete={handleDelete}
              onUserUpdate={handleUpdate}
            />
          ))}
      </Table>

      <Pagination
        pageNr={pageNr}
        setPageNr={setPageNr}
        dataPerPage={PER_PAGE}
        dataCount={allUsers.length}
      />
    </StyledUsers>
  );
}
