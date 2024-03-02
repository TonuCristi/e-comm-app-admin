import { HiMiniXMark } from "react-icons/hi2";
import styled from "styled-components";
import { FieldValues, UseFormReset } from "react-hook-form";
import Button from "./Button";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Icon = styled(HiMiniXMark)`
  font-size: 2.8rem;
  stroke-width: 1;
`;

type Props = {
  children: JSX.Element;
  reset: UseFormReset<FieldValues>;
};

export default function Search({ children, reset }: Props) {
  return (
    <StyledSearch>
      {children}
      <Button variant="operation" onClick={() => reset()}>
        <Icon />
      </Button>
    </StyledSearch>
  );
}
