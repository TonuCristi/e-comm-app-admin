import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import CloseIcon from "../../ui/CloseIcon";

import { Role, User, UserRequest } from "../../lib/types";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const UpdateButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const Title = styled.h2``;

const StyledUsersForm = styled.form`
  border: 3px solid var(--color-indigo-50);
  background-color: var(--color-indigo-900);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 2.4rem;
  border-radius: 1.7rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.8rem;
  background: none;
  border: 3px solid var(--color-indigo-50);
  outline: none;
  color: var(--color-indigo-50);
  border-radius: 0.7rem;

  &::placeholder {
    color: var(--color-indigo-50);
    opacity: 0.5;
  }
`;

type Props = {
  user: User;
  onUserUpdate: (id: string, user: UserRequest) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type Inputs = {
  username: string;
  email: string;
  role: Role;
};

export default function UsersForm({ user, onUserUpdate, setIsOpen }: Props) {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    onUserUpdate(user.id, data);
    setIsOpen(false);
  };

  return (
    <Overlay>
      <CloseButtonWrapper>
        <Button variant="operation" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </Button>
      </CloseButtonWrapper>

      <Wrapper>
        <Title>Update User</Title>

        <StyledUsersForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Username..."
            {...register("username", { required: true })}
          />
          <Input
            placeholder="Email..."
            {...register("email", { required: true })}
          />
          <Input
            placeholder="Role..."
            {...register("role", { required: true })}
          />

          <UpdateButtonWrapper>
            <Button variant="regular">Update user</Button>
          </UpdateButtonWrapper>
        </StyledUsersForm>
      </Wrapper>
    </Overlay>
  );
}
