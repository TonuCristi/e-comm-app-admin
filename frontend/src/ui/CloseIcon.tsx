import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";

const Icon = styled(HiMiniXMark)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

export default function CloseIcon() {
  return <Icon />;
}
