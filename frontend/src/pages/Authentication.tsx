import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../ui/Button";
import Message from "../ui/Message";

import UserApi from "../api/AuthApi";
import { AuthContext } from "../context/AuthContext";
import { UserResponse } from "../lib/types";

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
  width: 100%;
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

  &::placeholder {
    color: var(--color-indigo-50);
    font-size: 1.6rem;
    font-weight: 500;
    opacity: 0.6;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

export type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Authentication() {
  const {
    isLoading,
    setIsLoading,
    error,
    setError,
    // currentUser,
    setCurrentUser,
  } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const mapUser = ({ _id, ...user }: UserResponse) => ({
    id: _id,
    ...user,
  });

  function handleSignupUser(data: Inputs) {
    setIsLoading(true);
    UserApi.signupUser({ ...data, role: "admin" })
      .then((res) => {
        const user = mapUser(res);
        setCurrentUser(user);
        setError("");
        reset();
      })
      .catch((err) => {
        const errors: string[] = Object.values(err.response.data);
        for (let i = 0; i < errors.length; i++) {
          if (errors[i]) return setError(errors[i]);
        }
      })
      .finally(() => setIsLoading(false));
  }

  // console.log(error);
  // console.log(isLoading);
  // console.log(currentUser);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (!isLogin) handleSignupUser(data);
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
                minLength: 6,
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
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 25,
            })}
          />
          {!isLoading ? (
            <ButtonWrapper>
              <Button variant="auth" disabled={isLoading}>
                {isLogin ? "Login" : "Register"}
              </Button>
            </ButtonWrapper>
          ) : (
            <div>Loading...</div>
          )}
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
