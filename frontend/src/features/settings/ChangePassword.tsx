import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../ui/Button";
import Input from "./Input";

import { ChangePass } from "../../pages/Settings";

const StyledChangePassword = styled.div`
  background-color: var(--color-indigo-50);
  color: var(--color-indigo-900);
  border-radius: 1.1rem;
  padding: 2rem;

  @media (max-width: 1535px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.4rem;

  @media (max-width: 1535px) {
    margin-bottom: 1.8rem;
    text-align: center;
  }
`;

const Form = styled.form`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (max-width: 1535px) {
    width: 70%;
    gap: 1.4rem;
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2.4rem;

  @media (max-width: 1535px) {
    font-size: 1.8rem;
    margin-top: 2rem;
  }
`;

type Props = {
  id: string;
  onChangePassword: (id: string, password: ChangePass) => void;
  message: string;
};

export default function ChangePassword({
  id,
  onChangePassword,
  message,
}: Props) {
  const { register, handleSubmit } = useForm<ChangePass>();
  const onSubmit: SubmitHandler<ChangePass> = (data) => {
    onChangePassword(id, data);
  };

  return (
    <StyledChangePassword>
      <Title>Change password</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} name="password" placeholder="Password" />
        <Input
          register={register}
          name="repeatPassword"
          placeholder="Repeat password"
        />
        <Button variant="dark">Change password</Button>
      </Form>
      {message && <Message>{message}</Message>}
    </StyledChangePassword>
  );
}
