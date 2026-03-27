import { useNavigate } from "react-router-dom";
import "./GameCard.scss";
import type { IGame } from "../Games.types";

interface GameCardProps {
  game: IGame;
}

const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/games/${game._id}`);

  console.log(game.awayTeam.logo);

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="game-card__status">
        {game.status === "live" && (
          <span className="game-card__status-badge game-card__status-badge--live">
            LIVE · Q{game.quarter} {game.clock}
          </span>
        )}
        {game.status === "final" && (
          <span className="game-card__status-badge game-card__status-badge--final">
            FINAL
          </span>
        )}
        {game.status === "scheduled" && (
          <span className="game-card__status-badge game-card__status-badge--scheduled">
            {new Date(game.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </span>
        )}
      </div>

      <div className="game-card__matchup">
        <div className="game-card__team">
          <img
            className="game-card__team-logo"
            src={game.awayTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.awayTeam.abbreviation.toLowerCase()}.png`}
            alt={game.awayTeam.name}
          />
          <span className="game-card__team-name">{game.awayTeam.city}</span>
          <span className="game-card__team-abbr">
            {game.awayTeam.abbreviation}
          </span>
        </div>

        <div className="game-card__score">
          {game.status === "scheduled" ? (
            <span className="game-card__score-vs">VS</span>
          ) : (
            <>
              <span
                className={`game-card__score-num ${game.awayScore > game.homeScore ? "game-card__score-num--winning" : ""}`}
              >
                {game.awayScore}
              </span>
              <span className="game-card__score-divider">-</span>
              <span
                className={`game-card__score-num ${game.homeScore > game.awayScore ? "game-card__score-num--winning" : ""}`}
              >
                {game.homeScore}
              </span>
            </>
          )}
        </div>

        <div className="game-card__team game-card__team--home">
          <img
            className="game-card__team-logo"
            src={game.homeTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.homeTeam.abbreviation.toLowerCase()}.png`}
            alt={game.homeTeam.name}
          />
          <span className="game-card__team-name">{game.homeTeam.city}</span>
          <span className="game-card__team-abbr">
            {game.homeTeam.abbreviation}
          </span>
        </div>
      </div>

      <div className="game-card__arena">
        {game.arena.name}, {game.arena.city}
      </div>
    </div>
  );
};

export default GameCard;
