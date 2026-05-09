import { usePlayoffs } from './usePlayoffs';
import './Playoffs.scss';
import SeriesCard from './SeriesCard/SeriesCard';

const Playoffs = () => {
  const { rounds, isLoading, isError, expandedKey, handleExpand } = usePlayoffs();

  if (isLoading) return <div className="playoffs__loading">Loading playoffs...</div>;
  if (isError) return <div className="playoffs__error">Failed to load playoffs data.</div>;

  return (
    <div className="playoffs">
      <div className="playoffs__header">
        <h1 className="playoffs__title">2025–26 Playoffs</h1>
      </div>

      {rounds.map((round) => (
        <section key={round.label} className="playoffs__round">
          <h2 className="playoffs__round-label">{round.label}</h2>
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