import { useNavigate } from "react-router-dom";
import type { IStandingEntry, SortDir, SortKey } from "../Standings.types";

interface IUseStandingsTableProps {
  entries: IStandingEntry[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const useStandingsTable = ({
  entries,
  sortKey,
  sortDir,
}: IUseStandingsTableProps) => {
  const sorted = [...entries].sort((a, b) => {
    const mul = sortDir === "desc" ? -1 : 1;

    if (sortKey === "name") {
      const nameA = `${a.team.city} ${a.team.name}`;
      const nameB = `${b.team.city} ${b.team.name}`;
      return nameA.localeCompare(nameB) * mul;
    }

    return (a[sortKey] - b[sortKey]) * mul;
  });

  const navigate = useNavigate();

  return { sorted, navigate };
};

export default useStandingsTable;
