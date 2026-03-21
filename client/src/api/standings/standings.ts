import { useQuery } from '@tanstack/react-query';
import http from '../../services/http';
import type { IStandings } from '../../pages/Standings/Standings.types';

export const useTeamsStandings = () =>
  useQuery({
    queryKey: ['standings'],
    queryFn: () => http.get<IStandings>('/api/standings'),
    staleTime: 60 * 60 * 1000, // 1 hour
  });