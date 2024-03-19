import styled from "styled-components";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../features/users/TableRow";

const fields = ["Nr", "Id", "Username", "Email", "Role", "Joined", ""];

const StyledUsers = styled.div``;

export default function Users() {
  return (
    <StyledUsers>
      <Table variant="users">
        <TableHeader variant="users" fields={fields} />
        <TableRow />
      </Table>
    </StyledUsers>
  );
}
