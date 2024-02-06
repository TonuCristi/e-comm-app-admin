import styled from "styled-components";

import Field from "./Field";

type Props = {
  fields: string[];
};

const StyledTableHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 15fr 20fr 15fr 20fr 25fr;
  border-bottom: 3px solid var(--color-indigo-50);
`;

export default function TableHeader({ fields }: Props) {
  return (
    <StyledTableHeader>
      {fields.map((field) => (
        <Field key={field}>{field}</Field>
      ))}
    </StyledTableHeader>
  );
}
