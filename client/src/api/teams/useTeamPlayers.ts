import { useQuery } from '@tanstack/react-query';
import type { ITeamPlayer } from '../../pages/TeamDetails/TeamDetails.types';
import http from '../../services/http';

export const useTeamPlayers = (teamId: string) =>
  useQuery({
    queryKey: ['teams', teamId, 'players'],
    queryFn: () => http.get<ITeamPlayer[]>(`/api/teams/${teamId}/players`),
    enabled: !!teamId,
  });