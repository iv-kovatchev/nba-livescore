import type { IGameDetail } from "../GameDetail.types";

interface UseGameHeaderProps {
  game: IGameDetail;
}

const useGameHeader = ({ game }: UseGameHeaderProps) => {
  const getStatusLabel = () => {
    if (game.status === "live") return `Q${game.quarter} · ${game.clock}`;
    if (game.status === "final") return "Final";
    return (
      new Date(game.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      }) + " ET"
    );
  };

  return {
    getStatusLabel,
  };
};

export default useGameHeader;
