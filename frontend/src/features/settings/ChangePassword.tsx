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
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.4rem;
`;

const Form = styled.form`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

type Props = {
  id: string;
  onChangePassword: (id: string, password: ChangePass) => void;
};

export default function ChangePassword({ id, onChangePassword }: Props) {
  const { register, handleSubmit } = useForm<ChangePass>();
  const onSubmit: SubmitHandler<ChangePass> = (data) => {
    onChangePassword(id, data);
    console.log(data);
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
    </StyledChangePassword>
  );
}
