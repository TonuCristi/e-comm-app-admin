import styled, { css } from "styled-components";

type Variant = "error";

type Props = {
  variant: Variant;
  children: string;
};

type VariantProps = {
  $variant: Variant;
};

const variants = {
  error: css`
    color: var(--color-red-500);
    font-weight: 600;
  `,
};

const StyledMessage = styled.p<VariantProps>`
  ${(props) => variants[props.$variant]}
`;

export default function Message({ variant, children }: Props) {
  return <StyledMessage $variant={variant}>{children}</StyledMessage>;
}
