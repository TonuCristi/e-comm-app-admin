import { createPortal } from "react-dom";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import AddBuildingForm from "./AddBuildingForm";

const StyledAddBuildingButton = styled.div``;

const AddBuildingIcon = styled(HiMiniPlusSmall)`
  font-size: 2.8rem;
  stroke-width: 1;
`;

export default function AddBuildingButton() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <StyledAddBuildingButton>
      <Button onClick={handleClick} variant="operation">
        <AddBuildingIcon />
      </Button>
      {isOpen &&
        createPortal(<AddBuildingForm onClick={handleClick} />, document.body)}
    </StyledAddBuildingButton>
  );
}
