import styled from "styled-components";

import BuildingsTable from "../features/buildings/BuildingsTable";

const StyledBuildings = styled.div``;

export default function Buildings() {
  return (
    <StyledBuildings>
      <BuildingsTable />
    </StyledBuildings>
  );
}
