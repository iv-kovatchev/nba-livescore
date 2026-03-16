import { useQuery } from '@tanstack/react-query';
import type { IGameDetail } from '../../pages/GameDetail/GameDetail.types';
import http from '../../services/http';

export const useGameDetailQuery = (id: string) =>
  useQuery({
    queryKey: ['games', id],
    queryFn: () => http.get<IGameDetail>(`/api/games/${id}`),
    enabled: !!id,
  });