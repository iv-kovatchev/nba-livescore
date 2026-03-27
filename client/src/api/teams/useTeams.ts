import { useQuery } from '@tanstack/react-query';
import http from '../../services/http';
import type { ITeam } from '../../pages/Teams/Teams.types';

export const useTeams = () =>
  useQuery({
    queryKey: ['teams'],
    queryFn: () => http.get<ITeam[]>('/api/teams'),
  });