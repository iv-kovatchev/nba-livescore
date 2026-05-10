import { useTranslation } from "react-i18next";
import GameHeader from "./GameHeader/GameHeader";
import QuarterScores from "./QuarterScores/QuarterScores";
import { useGameDetail } from "./useGameDetail";
import { FiChevronLeft } from "../../components/Icons";
import "./GameDetail.scss";
import BoxScore from "./BoxScore/BoxScore";

const GameDetail = () => {
  const { t } = useTranslation();
  const { game, stats, loadingGame, loadingStats, handleBack } = useGameDetail();

  if (loadingGame) {
    return <div className="game-detail__loading">{t('gameDetail.loading')}</div>;
  }

  if (!game) {
    return <div className="game-detail__error">{t('gameDetail.error')}</div>;
  }

  return (
    <div className="game-detail">
      <button className="game-detail__back" onClick={handleBack}>
        <FiChevronLeft size={20} />
        {t('gameDetail.back')}
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
