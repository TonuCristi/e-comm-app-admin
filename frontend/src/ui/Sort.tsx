import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import Select from "./Select";

type Props = {
  defaultValue: string;
  sortTypes: object[];
  value: string | null;
};

export default function Sort({ sortTypes, defaultValue, value }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);

    if (
      searchParams.get("sort")?.toLowerCase() === defaultValue.toLowerCase()
    ) {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    }
  }

  return (
    <Select
      key={searchParams.get("sort")}
      defaultValue={value ?? defaultValue}
      onChange={handleChange}
    >
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
