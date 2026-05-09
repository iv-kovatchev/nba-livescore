import { useQuery } from '@tanstack/react-query';
import type { IPlayoffSeries } from '../../pages/Playoffs/Playoffs.types';
import http from '../../services/http';

export const usePlayoffsSeries = () =>
  useQuery({
    queryKey: ['playoffs', 'series'],
    queryFn: () => http.get<IPlayoffSeries[]>('/api/games/playoffs/series'),
    staleTime: 60 * 1000,
  });