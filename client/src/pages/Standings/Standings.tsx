import "./Standings.scss";
import { useTranslation } from "react-i18next";
import { useTeamsStandings } from "../../api/standings/standings";
import useStandings from "./useStandings";
import StandingsTable from "./StandingsTable/StandingsTable";

const Standings = () => {
  const { t } = useTranslation();
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
    return <div className="standings__loading">{t('standings.loading')}</div>;
  }

  if (!data) {
    return <div className="standings__error">{t('standings.error')}</div>;
  }

  return (
    <div className="standings">
      <h1 className="standings__title">{t('standings.title')}</h1>
      <p className="standings__subtitle">{t('standings.subtitle')}</p>

      <div className="standings__tabs">
        <button
          className={`standings__tab ${activeTab === "east" ? "standings__tab--active" : ""}`}
          onClick={switchToEast}
        >
          {t('standings.east')}
        </button>
        <button
          className={`standings__tab ${activeTab === "west" ? "standings__tab--active" : ""}`}
          onClick={switchToWest}
        >
          {t('standings.west')}
        </button>
      </div>

      <div className="standings__legend">
        <span className="standings__legend-item standings__legend-item--playoff">
          {t('standings.playoff')}
        </span>
        <span className="standings__legend-item standings__legend-item--play-in">
          {t('standings.playIn')}
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
