import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 6.4rem;
  font-size: 2rem;
  padding: 1.6rem;
  /* margin-left: 4.8rem; */

  /* @media (max-width: 1535px) {
    margin-left: 4.4rem;
  } */
`;

const StyledTitle = styled.div`
  font-weight: 500;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 80%;
    left: 100%;
    background-color: var(--color-red-500);
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 100%;
  }
`;

const Icon = styled(HiMiniBuildingOffice2)`
  color: var(--color-indigo-300);
`;

export default function Title() {
  return (
    <TitleContainer>
      <Icon />
      <StyledTitle>Builds.com</StyledTitle>
    </TitleContainer>
  );
}
