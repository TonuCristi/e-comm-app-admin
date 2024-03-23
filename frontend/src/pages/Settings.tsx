import { useContext, useState } from "react";
import styled from "styled-components";

import Loader from "../ui/Loader";
import LoaderWrapper from "../ui/LoaderWrapper";
import ProfileDetails from "../features/settings/ProfileDetails";
import ChangePassword from "../features/settings/ChangePassword";

import { GlobalContext } from "../context/GlobalContext";
import AuthApi from "../api/AuthApi";

const StyledSettings = styled.div`
  display: grid;
  grid-template-columns: 60fr 40fr;
  padding: 2.4rem;
  gap: 2.4rem;

  @media (max-width: 1535px) {
    grid-template-columns: 1fr;
  }
`;

export type ChangePass = {
  password: string;
  repeatPassword: string;
};

export default function Settings() {
  const { isLoading, error, currentUser } = useContext(GlobalContext);
  const [message, setMessage] = useState<string>("");

  function handleChangePassword(id: string, data: ChangePass) {
    AuthApi.changePass(id, data)
      .then((res) => setMessage(res.message))
      .catch((err) => setMessage(err.response.data.error));
  }

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (error) return <div>Something went wrong...</div>;

  return (
    <StyledSettings>
      <ProfileDetails currentUser={currentUser} />
      <ChangePassword
        id={currentUser.id}
        onChangePassword={handleChangePassword}
        message={message}
      />
    </StyledSettings>
  );
}
