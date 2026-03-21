import "./Standings.scss";
import { useTeamsStandings } from "../../api/standings/standings";
import useStandings from "./useStandings";
import StandingsTable from "./StandingsTable/StandingsTable";

const Standings = () => {
  const { data, isLoading } = useTeamsStandings();

  const {
    activeTab,
    switchToEast,
    switchToWest,
    sortKey,
    sortDir,
    handleSort,
  } = useStandings();

  if (isLoading) {
    return <div className="standings__loading">Loading standings...</div>;
  }

  if (!data) {
    return <div className="standings__error">Failed to load standings</div>;
  }

  return (
    <div className="standings">
      <h1 className="standings__title">NBA Standings</h1>
      <p className="standings__subtitle">2025-26 Regular Season</p>

      <div className="standings__tabs">
        <button
          className={`standings__tab ${activeTab === "east" ? "standings__tab--active" : ""}`}
          onClick={switchToEast}
        >
          Eastern Conference
        </button>
        <button
          className={`standings__tab ${activeTab === "west" ? "standings__tab--active" : ""}`}
          onClick={switchToWest}
        >
          Western Conference
        </button>
      </div>

      <div className="standings__legend">
        <span className="standings__legend-item standings__legend-item--playoff">
          Playoff
        </span>
        <span className="standings__legend-item standings__legend-item--play-in">
          Play-In
        </span>
      </div>

      {activeTab === "east" ? (
        <StandingsTable entries={data.east} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
      ) : (
        <StandingsTable entries={data.west} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
      )}
    </div>
  );
};

export default Standings;
