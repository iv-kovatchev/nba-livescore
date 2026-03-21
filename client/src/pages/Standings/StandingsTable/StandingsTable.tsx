import { FiChevronDown, FiChevronUp } from "../../../components/Icons";
import type { IStandingEntry, SortDir, SortKey } from "../Standings.types";
import useStandingsTable from "./useStandingsTable";

interface StaindingsTableProps {
  entries: IStandingEntry[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => {
  if (!active) return <FiChevronDown className="standings__sort-icon" />;
  return dir === "desc" ? (
    <FiChevronDown className="standings__sort-icon standings__sort-icon--active" />
  ) : (
    <FiChevronUp className="standings__sort-icon standings__sort-icon--active" />
  );
};

const StandingsTable = ({
  entries,
  sortKey,
  sortDir,
  onSort,
}: StaindingsTableProps) => {
  const { sorted } = useStandingsTable({
    entries,
    sortKey,
    sortDir,
    onSort,
  });

  return (
    <div className="standings__table-wrapper">
      <table className="standings__table">
        <thead>
          <tr>
            <th className="standings__rank">#</th>
            <th className="standings__team-col" onClick={() => onSort("name")}>
              Team <SortIcon active={sortKey === "name"} dir={sortDir} />
            </th>
            <th onClick={() => onSort("wins")}>
              W <SortIcon active={sortKey === "wins"} dir={sortDir} />
            </th>
            <th onClick={() => onSort("losses")}>
              L <SortIcon active={sortKey === "losses"} dir={sortDir} />
            </th>
            <th onClick={() => onSort("winPct")}>
              PCT <SortIcon active={sortKey === "winPct"} dir={sortDir} />
            </th>
            <th onClick={() => onSort("gamesPlayed")} className="standings__gp">
              GP <SortIcon active={sortKey === "gamesPlayed"} dir={sortDir} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, index) => (
            <tr
              key={entry.team._id}
              className={
                index < 6
                  ? "standings__row--playoff"
                  : index < 10
                    ? "standings__row--play-in"
                    : ""
              }
            >
              <td className="standings__rank">{index + 1}</td>
              <td className="standings__team-cell">
                <img
                  src={`https://a.espncdn.com/i/teamlogos/nba/500/${entry.team.abbreviation.toLowerCase()}.png`}
                  alt={entry.team.name}
                  className="standings__logo"
                />
                <div className="standings__team-info">
                  <span className="standings__team-city">
                    {entry.team.city}
                  </span>
                  <span className="standings__team-name">
                    {entry.team.name}
                  </span>
                </div>
              </td>
              <td className="standings__wins">{entry.wins}</td>
              <td>{entry.losses}</td>
              <td className="standings__pct">
                {entry.winPct.toFixed(3).replace(/^0/, "")}
              </td>
              <td className="standings__gp">{entry.gamesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
