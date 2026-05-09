import { useSeriesCard } from "./useSeriesCard";
import type { IPlayoffSeries } from "../Playoffs.types";
import { FiChevronDown } from "../../../components/Icons";
import "./SeriesCard.scss";

interface IProps {
  series: IPlayoffSeries;
  expanded: boolean;
  onToggle: () => void;
}

const SeriesCard = ({ series, expanded, onToggle }: IProps) => {
  const {
    team1,
    team2,
    team1Wins,
    team2Wins,
    hasLiveGame,
    gamesPlayed,
    isFinished,
    winner,
    statusLabel,
    handleGameClick,
  } = useSeriesCard(series);

  return (
    <div
      className={`series-card ${isFinished ? "series-card--finished" : ""} ${hasLiveGame ? "series-card--live" : ""}`}
    >
      <div className="series-card__summary" onClick={onToggle}>
        {hasLiveGame && (
          <div className="series-card__live-badge">
            <span className="series-card__live-dot" />
            LIVE
          </div>
        )}

        <div
          className={`series-card__team ${winner === "team2" ? "series-card__team--eliminated" : ""}`}
        >
          <img
            className="series-card__logo"
            src={
              team1.logo ??
              `https://a.espncdn.com/i/teamlogos/nba/500/${team1.abbreviation.toLowerCase()}.png`
            }
            alt={team1.name}
          />
          <span className="series-card__team-name">
            <span className="series-card__team-city">{team1.city}</span>
            <span className="series-card__team-nickname">{team1.name}</span>
          </span>
          <span
            className={`series-card__wins ${winner === "team1" ? "series-card__wins--champion" : ""}`}
          >
            {team1Wins}
          </span>
        </div>

        <div className="series-card__vs">vs</div>

        <div
          className={`series-card__team ${winner === "team1" ? "series-card__team--eliminated" : ""}`}
        >
          <img
            className="series-card__logo"
            src={
              team2.logo ??
              `https://a.espncdn.com/i/teamlogos/nba/500/${team2.abbreviation.toLowerCase()}.png`
            }
            alt={team2.name}
          />
          <span className="series-card__team-name">
            <span className="series-card__team-city">{team2.city}</span>
            <span className="series-card__team-nickname">{team2.name}</span>
          </span>
          <span
            className={`series-card__wins ${winner === "team2" ? "series-card__wins--champion" : ""}`}
          >
            {team2Wins}
          </span>
        </div>

        <div className="series-card__footer">
          <div className="series-card__footer-left">
            <span className="series-card__status">{statusLabel}</span>
            <span className="series-card__games-played">
              {gamesPlayed} games played
            </span>
          </div>
          <div
            className={`series-card__chevron ${expanded ? "series-card__chevron--expanded" : ""}`}
          >
            <FiChevronDown size={16} />
          </div>
        </div>
      </div>

      <div
        className={`series-card__games ${expanded ? "series-card__games--expanded" : ""}`}
      >
        <div className="series-card__games-inner">
          <table className="series-card__table">
            <thead>
              <tr>
                <th>Game</th>
                <th>
                  {team1.city} {team1.name}
                </th>
                <th>
                  {team2.city} {team2.name}
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {series.games.map((game, index) => {
                const isHome = game.homeTeam._id === team1._id;
                const team1Score = isHome ? game.homeScore : game.awayScore;
                const team2Score = isHome ? game.awayScore : game.homeScore;
                const isPlayable = game.status !== "scheduled";
                const team1Won = isPlayable && team1Score > team2Score;
                const team2Won = isPlayable && team2Score > team1Score;

                return (
                  <tr
                    key={game._id}
                    className={`series-card__row ${isPlayable ? "series-card__row--clickable" : ""} ${game.status === "live" ? "series-card__row--live" : ""}`}
                    onClick={() => isPlayable && handleGameClick(game._id)}
                  >
                    <td>
                      <div className="series-card__game-num">G{index + 1}</div>
                    </td>
                    <td>
                      <div
                        className={`series-card__score ${team1Won ? "series-card__score--winner" : ""}`}
                      >
                        {isPlayable ? team1Score : "–"}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`series-card__score ${team2Won ? "series-card__score--winner" : ""}`}
                      >
                        {isPlayable ? team2Score : "–"}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`series-card__game-status series-card__game-status--${game.status}`}
                      >
                        {game.status === "live"
                          ? "LIVE"
                          : game.status === "final"
                            ? "Final"
                            : new Date(game.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
