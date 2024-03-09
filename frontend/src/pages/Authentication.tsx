import styled from "styled-components";
import Button from "../ui/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

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
`;

const Title = styled.h1``;

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
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);

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
                minLength: 5,
                maxLength: 25,
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
              minLength: 5,
              maxLength: 25,
            })}
          />
          <ButtonWrapper>
            <Button variant="auth">{isLogin ? "Login" : "Register"}</Button>
          </ButtonWrapper>
        </AuthForm>
        <Button variant="auth" onClick={() => setIsLogin((prev) => !prev)}>
          Create new account
        </Button>
      </Container>
    </StyledAuthenticaton>
  );
}
