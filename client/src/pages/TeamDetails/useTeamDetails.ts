import { useParams } from "react-router-dom";

import { useTeam } from "../../api/teams/useTeam";
import type { ITeamDetails } from "./TeamDetails.types";
import { useTeamPlayers } from "../../api/teams/useTeamPlayers";

export const useTeamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: team, isLoading } = useTeam(id!);

  const { data: players = [], isLoading: loadingPlayers } = useTeamPlayers(id!);

  return {
    team: team as unknown as ITeamDetails,
    players,
    isLoading,
    loadingPlayers,
  };
};
