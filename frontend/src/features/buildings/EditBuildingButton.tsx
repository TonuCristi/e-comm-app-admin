import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiMiniArrowSmallDown } from "react-icons/hi2";

import Button from "../../ui/Button";
import BuildingForm from "./BuildingForm";

import { BuildingWithoutId } from "../../lib/types";

type Props = {
  id: string;
  onUpdate: (id: string, building: BuildingWithoutId) => void;
  building: BuildingWithoutId;
};

const StyledEditBuildingButton = styled.div``;

const Icon = styled(HiMiniArrowSmallDown)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

export default function EditBuildingButton({ id, onUpdate, building }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <StyledEditBuildingButton>
      <Button onClick={handleClick} variant="operation">
        <Icon />
      </Button>
      {isOpen &&
        createPortal(
          <BuildingForm
            title="update"
            onClick={handleClick}
            id={id}
            onUpdate={onUpdate}
            building={building}
          />,
          document.body
        )}
    </StyledEditBuildingButton>
  );
}