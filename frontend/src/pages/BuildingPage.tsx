import styled from "styled-components";

import Info from "./Info";

import { useParams } from "react-router-dom";

const StyledBuildingPage = styled.div`
  font-weight: 600;
`;

export default function BuildingPage() {
  const { buildingId } = useParams();

  return (
    <StyledBuildingPage>
      <Info buildingId={buildingId} />
    </StyledBuildingPage>
  );
}
