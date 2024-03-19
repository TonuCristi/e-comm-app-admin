import { HiMiniXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledRemoveIcon = styled(HiMiniXMark)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

export default function RemoveIcon() {
  return <StyledRemoveIcon />;
}
