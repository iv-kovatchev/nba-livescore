import { useTranslation } from "react-i18next";
import { usePlayoffs } from "./usePlayoffs";
import "./Playoffs.scss";
import SeriesCard from "./SeriesCard/SeriesCard";

const Playoffs = () => {
  const { t } = useTranslation();
  const { rounds, isLoading, isError, expandedKey, handleExpand } =
    usePlayoffs();

  if (isLoading)
    return <div className="playoffs__loading">{t("playoffs.loading")}</div>;
  if (isError)
    return <div className="playoffs__error">{t("playoffs.error")}</div>;

  return (
    <div className="playoffs">
      <div className="playoffs__header">
        <h1 className="playoffs__title">{t("playoffs.title")}</h1>
      </div>

      {rounds.map((round) => (
        <section key={round.labelKey } className="playoffs__round">
          <h2 className="playoffs__round-label">{t(round.labelKey)}</h2>
          <div className="playoffs__grid">
            {round.series.map((series) => {
              const key = `${series.team1._id}-${series.team2._id}`;
              return (
                <SeriesCard
                  key={key}
                  series={series}
                  expanded={expandedKey === key}
                  onToggle={() => handleExpand(key)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Playoffs;
