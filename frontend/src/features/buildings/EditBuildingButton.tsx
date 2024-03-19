import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import BuildingForm from "./BuildingForm";
import UpdateIcon from "../../ui/UpdateIcon";

import { BuildingRequest, BuildingWithoutId } from "../../lib/types";

type Props = {
  id: string;
  onUpdate: (id: string, building: BuildingRequest) => void;
  building: BuildingWithoutId;
};

const StyledEditBuildingButton = styled.div``;

export default function EditBuildingButton({ id, onUpdate, building }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <StyledEditBuildingButton>
      <Button onClick={handleClick} variant="operation">
        <UpdateIcon />
      </Button>
      {isOpen &&
        createPortal(
          <BuildingForm
            title="Update"
            onClick={handleClick}
            id={id}
            onUpdate={onUpdate}
            defaultValues={building}
          />,
          document.body
        )}
    </StyledEditBuildingButton>
  );
}
