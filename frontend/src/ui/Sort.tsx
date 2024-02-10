import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import Select from "./Select";

type Props = {
  sortTypes: object[];
  defaultValue: string;
};

export default function Sort({ sortTypes, defaultValue }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select defaultValue={defaultValue} onChange={handleChange}>
      {sortTypes.map((type) => {
        const [key, value] = Object.entries(type)[0];
        return (
          <option key={key} value={key}>
            {value}
          </option>
        );
      })}
    </Select>
  );
}
