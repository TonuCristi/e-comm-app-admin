import styled from "styled-components";

const StyledAvatar = styled.div`
  border: 3px solid var(--color-indigo-50);
  padding: 0.9rem;
  border-radius: 1.1rem;
`;

type Props = {
  username: string;
};

export default function Avatar({ username }: Props) {
  return <StyledAvatar>{username}</StyledAvatar>;
}
