import { FieldValues, UseFormRegister } from "react-hook-form";
import styled, { css } from "styled-components";

type Variant = "search";

type VariantProps = {
  $variant: Variant;
};

const variants = {
  search: css`
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
  `,
};

const StyledInput = styled.input<VariantProps>`
  border: none;
  background: none;
  outline: none;

  ${(props) => variants[props.$variant]}
`;

type Props = {
  variant: Variant;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  searchField: string;
};

export default function Input({
  variant,
  placeholder,
  register,
  searchField,
}: Props) {
  return (
    <StyledInput
      $variant={variant}
      placeholder={placeholder}
      {...register(searchField)}
    />
  );
}
