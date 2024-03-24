import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../ui/Button";
import Message from "../ui/Message";

import AuthApi from "../api/AuthApi";
import { AuthContext } from "../context/AuthContext";
import { UserRequestLogin } from "../lib/types";
import ShowPassIcon from "../ui/ShowPassIcon";
import HidePassIcon from "../ui/HidePassIcon";

const StyledAuthenticaton = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 3px solid var(--color-indigo-50);
  border-radius: 1.9rem;
  width: 30%;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 1279px) {
    width: 45%;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid var(--color-indigo-50);
`;

const Input = styled.input`
  background: none;
  outline: none;
  border: 3px solid var(--color-indigo-50);
  color: var(--color-indigo-50);
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  font-family: inherit;
  border-radius: 1.1rem;
  width: 100%;

  &::placeholder {
    color: var(--color-indigo-50);
    font-size: 1.6rem;
    font-weight: 500;
    opacity: 0.6;
  }
`;

const InputWrapper = styled.div`
  border: 3px solid var(--color-indigo-50);
  border-radius: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
`;

const PasswordInput = styled.input`
  background: none;
  outline: none;
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  font-family: inherit;
  color: var(--color-indigo-50);
  padding: 1.2rem 0 1.2rem 1.2rem;
  width: 100%;

  &::placeholder {
    color: var(--color-indigo-50);
    font-size: 1.6rem;
    font-weight: 500;
    opacity: 0.6;
  }
`;

const ShowPassBtn = styled.div`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1.2rem 1.2rem 1.2rem 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

export type Inputs = {
  username: string;
  email: string;
  password: string;
  role: "admin";
};

export default function Authentication() {
  const { isLoading, setIsLoading, error, setError, setToken } =
    useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isHidden, setIsHidden] = useState(true);

  function handleSignupUser(data: Inputs) {
    AuthApi.signupUser({ ...data, role: "admin" })
      .then((res) => {
        localStorage.setItem("token", res);

        setToken(res);

        setError("");
        reset();
      })
      .catch((err) => {
        const error = err.response.data.error;
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLoginUser(user: UserRequestLogin) {
    setIsLoading(true);
    AuthApi.loginUser(user)
      .then((res) => {
        localStorage.setItem("token", res);

        setToken(res);

        setError("");
        reset();
      })
      .catch((err) => {
        const error = err.response.data.error;
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (!isLogin) handleSignupUser(data);
    if (isLogin) handleLoginUser(data);
  };

  return (
    <StyledAuthenticaton>
      <Container>
        <Title>{isLogin ? "Login" : "Register"}</Title>
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <Input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: true,
              })}
            />
          )}

          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />

          <InputWrapper>
            <PasswordInput
              type={isHidden ? "password" : "text"}
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />

            <ShowPassBtn onClick={() => setIsHidden((prev) => !prev)}>
              {isHidden ? <ShowPassIcon /> : <HidePassIcon />}
            </ShowPassBtn>
          </InputWrapper>

          <ButtonWrapper>
            <Button variant="auth" disabled={isLoading}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </ButtonWrapper>

          {!!error && <Message variant="error">{error}</Message>}
        </AuthForm>

        <Button
          variant="auth"
          onClick={() => {
            reset();
            setIsLogin((prev) => !prev);
          }}
        >
          {isLogin ? "Create new account" : "Already have an account?"}
        </Button>
      </Container>
    </StyledAuthenticaton>
  );
}
