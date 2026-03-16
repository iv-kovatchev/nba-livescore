import { useNavigate, useParams } from "react-router-dom";
import { useGameStats } from "../../api/games/useGameStats";
import { useGameDetailQuery } from "../../api/games/useGameDetail";

export const useGameDetail = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const { data: game, isLoading: loadingGame } = useGameDetailQuery(id!);

  const { data: stats = [], isLoading: loadingStats } = useGameStats(
    id!,
    !!game && game.status !== "scheduled",
  );

  return { game, stats, loadingGame, loadingStats, handleBack };
};
