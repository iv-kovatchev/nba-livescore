import GameHeader from "./GameHeader/GameHeader";
import QuarterScores from "./QuarterScores/QuarterScores";
import { useGameDetail } from "./useGameDetail";
import { FiChevronLeft } from "../../components/Icons";
import "./GameDetail.scss";
import BoxScore from "./BoxScore/BoxScore";

const GameDetail = () => {
  const { game, stats, loadingGame, loadingStats, handleBack } =
    useGameDetail();

  if (loadingGame) {
    return <div className="game-detail__loading">Loading...</div>;
  }

  if (!game) {
    return <div className="game-detail__error">Game not found</div>;
  }

  return (
    <div className="game-detail">
      <button className="game-detail__back" onClick={handleBack}>
        <FiChevronLeft size={20} />
        Back
      </button>
      <GameHeader game={game} />
      {game.status !== "scheduled" && <QuarterScores game={game} />}
      {game.status !== "scheduled" && (
        <BoxScore
          stats={stats}
          loading={loadingStats}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
        />
      )}
    </div>
  );
};

export default GameDetail;
