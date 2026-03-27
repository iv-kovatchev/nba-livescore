import type { IGameDetail } from "../GameDetail.types";
import "./GameHeader.scss";
import useGameHeader from "./useGameHeader";

interface GameHeaderProps {
  game: IGameDetail;
}

const GameHeader = ({ game }: GameHeaderProps) => {
  const { getStatusLabel } = useGameHeader({ game });

  return (
    <div className="game-header">
      <div className="game-header__status">
        {game.status === "live" && (
          <span className="game-header__status-badge game-header__status-badge--live">
            <span className="game-header__live-dot" />
            LIVE
          </span>
        )}
        <span className="game-header__status-label">{getStatusLabel()}</span>
      </div>

      <div className="game-header__matchup">
        <div className="game-header__team">
          <img
            className="game-header__logo"
            src={game.awayTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.awayTeam.abbreviation.toLowerCase()}.png`}
            alt={game.awayTeam.name}
          />
          <span className="game-header__city">{game.awayTeam.city}</span>
          <span className="game-header__name">{game.awayTeam.name}</span>
        </div>

        <div className="game-header__score">
          {game.status === "scheduled" ? (
            <span className="game-header__vs">VS</span>
          ) : (
            <>
              <span className={`game-header__score-num ${game.awayScore > game.homeScore ? "game-header__score-num--winning" : ""}`}>
                {game.awayScore}
              </span>
              <span className="game-header__score-divider">—</span>
              <span className={`game-header__score-num ${game.homeScore > game.awayScore ? "game-header__score-num--winning" : ""}`}>
                {game.homeScore}
              </span>
            </>
          )}
        </div>

        <div className="game-header__team game-header__team--home">
          <img
            className="game-header__logo"
            src={game.homeTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.homeTeam.abbreviation.toLowerCase()}.png`}
            alt={game.homeTeam.name}
          />
          <span className="game-header__city">{game.homeTeam.city}</span>
          <span className="game-header__name">{game.homeTeam.name}</span>
        </div>
      </div>

      <div className="game-header__arena">
        {game.arena.name} · {game.arena.city}, {game.arena.state}
      </div>
    </div>
  );
};

export default GameHeader;