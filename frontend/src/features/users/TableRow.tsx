import styled from "styled-components";
import Field from "../../ui/Field";
import { useState } from "react";
import Button from "../../ui/Button";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { createPortal } from "react-dom";
import RemoveIcon from "../../ui/RemoveIcon";
import UpdateIcon from "../../ui/UpdateIcon";

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 25fr 20fr 20fr 10fr 10fr 5fr 5fr;
  border-bottom: 3px solid var(--color-indigo-300);

  &:last-child {
    border-bottom: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function TableRow() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTableRow>
      <Field>1</Field>
      <Field>65df7faee0defbf577c1d2ac</Field>
      <Field>Tonu Cristian</Field>
      <Field>cristian@example.com</Field>
      <Field>admin</Field>
      <Field>10.10.2002</Field>

      <Field>
        <Wrapper>
          <Button onClick={() => setIsOpen(true)} variant="operation">
            <RemoveIcon />
          </Button>
          {isOpen &&
            createPortal(
              <ConfirmationModal onClick={() => {}} setIsOpen={setIsOpen} />,
              document.body
            )}
        </Wrapper>
      </Field>
      <Field>
        <Wrapper>
          <Button variant="operation">
            <UpdateIcon />
          </Button>
        </Wrapper>
      </Field>

      {/* <Field>
        <Wrapper>
          <EditBuildingButton
            id={id}
            onUpdate={onBuildingUpdate}
            building={building}
          />
        </Wrapper>
      </Field>
      <Field>
        <Wrapper>
          <BuldingLink to={`/buildings/${id}`}>
            <ToBuildingIcon />
          </BuldingLink>
        </Wrapper>
      </Field> */}
    </StyledTableRow>
  );
}
