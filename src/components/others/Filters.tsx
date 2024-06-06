import { GENDERS, SPECIES, STATUS } from "@/common";
import { Input, Select } from "@mantine/core";
interface FiltersProps {
  onFilterChange: (key: string, value: string | null) => void;
}

export default function Filters(props: FiltersProps) {
  const searchParams = new URLSearchParams(location.search);
  const species = searchParams.get("species");
  const status = searchParams.get("status");
  const gender = searchParams.get("gender");
  const name = searchParams.get("name");

  return (
    <div className="flex items-center gap-3 w-phone:flex-col w-phone:w-full">
      <Input
        className="w-phone:w-full"
        placeholder="search by name"
        onChange={(event) =>
          props.onFilterChange("name", event.currentTarget.value)
        }
        defaultValue={name || ""}
      />
      <Select
        className="w-phone:w-full"
        placeholder="Species"
        data={SPECIES}
        onChange={(val) => props.onFilterChange("species", val)}
        defaultValue={species}
        clearable
      />
      <Select
        className="w-phone:w-full"
        placeholder="Status"
        data={STATUS}
        onChange={(val) => props.onFilterChange("status", val)}
        defaultValue={status}
        clearable
      />
      <Select
        className="w-phone:w-full"
        placeholder="Gender"
        data={GENDERS}
        onChange={(val) => props.onFilterChange("gender", val)}
        defaultValue={gender}
        clearable
      />
    </div>
  );
}
