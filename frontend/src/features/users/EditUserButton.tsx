import { useState } from "react";

import Button from "../../ui/Button";
import UpdateIcon from "../../ui/UpdateIcon";
import { createPortal } from "react-dom";
import UsersForm from "./UsersForm";

export default function EditUserButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="operation" onClick={() => setIsOpen(true)}>
        <UpdateIcon />
      </Button>
      {isOpen && createPortal(<UsersForm />, document.body)}
    </>
  );
}
