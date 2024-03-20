import styled from "styled-components";

const StyledAvatar = styled.div`
  font-weight: 500;
`;

type Props = {
  username: string;
};

export default function Avatar({ username }: Props) {
  return <StyledAvatar>{username}</StyledAvatar>;
}
