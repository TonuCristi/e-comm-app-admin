import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoader = styled.div`
  width: 6rem;
  height: 6rem;
  /* background-color: blue; */
  position: relative;
`;

const Circle = styled.div`
  border: 0.8rem solid var(--color-indigo-50);
  border-radius: 100%;
  width: 6rem;
  height: 6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const circlePart = keyframes`
    to {
      transform: rotate(1turn);
    }
`;

const CirclePart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6rem;
  height: 6rem;
  border-right: 0.8rem solid var(--color-indigo-700);
  border-bottom: 0.8rem solid transparent;
  border-left: 0.8rem solid transparent;
  border-top: 0.8rem solid transparent;
  border-radius: 100%;

  animation: ${circlePart} 0.7s linear infinite;
`;

export default function Loader() {
  return (
    <Wrapper>
      <StyledLoader>
        <Circle />
        <CirclePart />
      </StyledLoader>
    </Wrapper>
  );
}
