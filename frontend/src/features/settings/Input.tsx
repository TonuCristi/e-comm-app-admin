import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

import ShowPassIcon from "../../ui/ShowPassIcon";
import HidePassIcon from "../../ui/HidePassIcon";
import { ChangePass } from "../../pages/Settings";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 3px solid var(--color-indigo-300);
  border-radius: 0.7rem;
`;

const StyledInput = styled.input`
  border: none;
  background: none;
  font-size: inherit;
  width: 100%;
  color: var(--color-indigo-500);
  font-weight: 600;
  padding: 0.8rem 0 0.8rem 0.8rem;
  outline: none;

  &::placeholder {
    font-weight: 600;
    color: var(--color-indigo-200);
  }
`;

const ShowPassBtn = styled.div`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.8rem 0.8rem 0.8rem 0;
`;

type Props = {
  type: string;
  register: UseFormRegister<ChangePass>;
  name: "password" | "repeatPassword";
  placeholder: string;
};

export default function Input({ type, register, name, placeholder }: Props) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <InputWrapper>
      <StyledInput
        type={isHidden ? "password" : type}
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      <ShowPassBtn onClick={() => setIsHidden((prev) => !prev)}>
        {isHidden ? <ShowPassIcon /> : <HidePassIcon />}
      </ShowPassBtn>
    </InputWrapper>
  );
}
