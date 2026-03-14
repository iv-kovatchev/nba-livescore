import { useQuery } from '@tanstack/react-query';
import type { IGame } from '../../pages/Games/Games.types';
import http from '../../services/http';

export const useGame = (id: string) =>
  useQuery({
    queryKey: ['games', id],
    queryFn: () => http.get<IGame>(`/api/games/${id}`),
    enabled: !!id,
  });
