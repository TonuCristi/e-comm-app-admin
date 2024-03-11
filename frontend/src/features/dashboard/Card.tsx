import { ReactNode } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  border: 3px solid var(--color-indigo-50);
  border-radius: 1.3rem;
  padding: 1.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;

const Title = styled.h3`
  font-size: 2rem;

  @media (max-width: 1535px) {
    font-size: 1.8rem;
  }
`;

const Data = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  padding: 0.6rem;
  border-bottom: 3px solid var(--color-indigo-50);
  width: min-content;
`;

type Props = {
  children: ReactNode;
  type?: string;
  title: string;
  data: number;
};

export default function Card({ children, type, title, data }: Props) {
  return (
    <StyledCard>
      <Wrapper>
        <Title>{title}</Title>
        {children}
      </Wrapper>

      {!type && (
        <Data>
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumSignificantDigits: 3,
          }).format(data)}
        </Data>
      )}

      {type === "currency" && (
        <Data>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            notation: "compact",
            maximumSignificantDigits: 3,
            currency: "USD",
          }).format(data)}
        </Data>
      )}
    </StyledCard>
  );
}
