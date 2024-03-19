import { useState } from "react";
import { createPortal } from "react-dom";
import { HiMiniPlusSmall } from "react-icons/hi2";
import styled from "styled-components";

import Button from "../../ui/Button";
import BuildingForm from "./BuildingForm";

import { BuildingRequest } from "../../lib/types";

type Props = {
  onBuildingAdd: (building: BuildingRequest) => void;
};

const StyledAddBuildingButton = styled.div``;

const Icon = styled(HiMiniPlusSmall)`
  font-size: 2.8rem;
  stroke-width: 1;
`;

export default function AddBuildingButton({ onBuildingAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <StyledAddBuildingButton>
      <Button onClick={handleClick} variant="operation">
        <Icon />
      </Button>
      {isOpen &&
        createPortal(
          <BuildingForm
            title="Add"
            onClick={handleClick}
            onAdd={onBuildingAdd}
          />,
          document.body
        )}
    </StyledAddBuildingButton>
  );
}
