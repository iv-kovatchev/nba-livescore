import { useQuery } from '@tanstack/react-query';
import type { IGame } from '../../pages/Games/Games.types';
import http from '../../services/http';

export const useGames = () =>
  useQuery({
    queryKey: ['games'],
    queryFn: () => http.get<IGame[]>('/api/games'),
  });