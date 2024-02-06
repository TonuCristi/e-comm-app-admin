import styled from "styled-components";

const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const Image = styled.img`
  background-color: var(--color-indigo-50);
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
`;

export default function Avatar() {
  return (
    <StyledAvatar>
      {"Jack Reacher"}
      <Image src="" alt={`Photo of ${"Jack Reacher"}`} />
    </StyledAvatar>
  );
}
