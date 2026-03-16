import { useQuery } from '@tanstack/react-query';
import type { IPlayerStat } from '../../pages/GameDetail/GameDetail.types';
import http from '../../services/http';

export const useGameStats = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ['games', id, 'stats'],
    queryFn: () => http.get<IPlayerStat[]>(`/api/games/${id}/stats`),
    enabled: !!id && enabled,
  });