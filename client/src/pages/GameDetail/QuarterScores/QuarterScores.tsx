import { useTranslation } from "react-i18next";
import type { IGameDetail } from "../GameDetail.types";
import "./QuarterScores.scss";

interface QuarterScoresProps {
  game: IGameDetail;
}

const QuarterScores = ({ game }: QuarterScoresProps) => {
  const { t } = useTranslation();
  const hasOT = game.homeOT !== null || game.awayOT !== null;

  return (
    <div className="quarter-scores">
      <h3 className="quarter-scores__title">{t('gameDetail.quarterScores')}</h3>
      <div className="quarter-scores__table-wrapper">
        <table className="quarter-scores__table">
          <thead>
            <tr>
              <th className="quarter-scores__team-col">{t('gameDetail.team')}</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Q4</th>
              {hasOT && <th>OT</th>}
              <th className="quarter-scores__total">{t('gameDetail.total')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="quarter-scores__team-cell">
                <img
                  src={game.awayTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.awayTeam.abbreviation.toLowerCase()}.png`}
                  alt={game.awayTeam.name}
                  className="quarter-scores__logo"
                />
                <span>{game.awayTeam.abbreviation}</span>
              </td>
              <td>{game.awayQ1 ?? "—"}</td>
              <td>{game.awayQ2 ?? "—"}</td>
              <td>{game.awayQ3 ?? "—"}</td>
              <td>{game.awayQ4 ?? "—"}</td>
              {hasOT && <td>{game.awayOT ?? "—"}</td>}
              <td className="quarter-scores__total">{game.awayScore}</td>
            </tr>
            <tr>
              <td className="quarter-scores__team-cell">
                <img
                  src={game.homeTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${game.homeTeam.abbreviation.toLowerCase()}.png`}
                  alt={game.homeTeam.name}
                  className="quarter-scores__logo"
                />
                <span>{game.homeTeam.abbreviation}</span>
              </td>
              <td>{game.homeQ1 ?? "—"}</td>
              <td>{game.homeQ2 ?? "—"}</td>
              <td>{game.homeQ3 ?? "—"}</td>
              <td>{game.homeQ4 ?? "—"}</td>
              {hasOT && <td>{game.homeOT ?? "—"}</td>}
              <td className="quarter-scores__total">{game.homeScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuarterScores;
