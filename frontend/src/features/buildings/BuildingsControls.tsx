import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";

import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import Button from "../../ui/Button";

import { Building } from "../../lib/types";

const sortTypes = [
  { default: "Default" },
  {
    "price-asc": "Price ascending",
  },
  {
    "price-desc": "Price descending",
  },
  {
    "area-asc": "Area ascending",
  },
  {
    "area-desc": "Area descending",
  },
];

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;

const Icon = styled(HiMiniXMark)`
  font-size: 2.8rem;
  stroke-width: 1;
`;

type Props = {
  children: JSX.Element[];
  buildings: Building[];
};

export default function BuildingsControls({ children, buildings }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    const keys = [];
    for (const key of searchParams.keys()) {
      keys.push(key);
    }

    keys.forEach((key) => {
      searchParams.delete(key);
    });

    setSearchParams(searchParams);
  }

  return (
    <StyledControls>
      {children}
      <Filter
        defaultValue="All"
        value={searchParams.get("type")}
        buildings={buildings}
        filter="type"
      />
      <Filter
        defaultValue="All"
        value={searchParams.get("location")}
        buildings={buildings}
        filter="location"
      />
      <Sort
        defaultValue="Default"
        value={searchParams.get("sort")}
        sortTypes={sortTypes}
      />
      <Button variant="operation" onClick={handleClick}>
        <Icon />
      </Button>
    </StyledControls>
  );
}
