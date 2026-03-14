import { useQuery } from '@tanstack/react-query';
import type { IGame } from '../../pages/Games/Games.types';
import http from '../../services/http';

export const useGamesByDate = (date: string) =>
  useQuery({
    queryKey: ['games', date],
    queryFn: () => http.get<IGame[]>(`/api/games/by-date?date=${date}`),
    refetchInterval: 60 * 1000,
  });