import { useQuery } from '@tanstack/react-query';
import type { ITeam } from '../../pages/Teams/Teams.types';
import http from '../../services/http';

export const useTeam = (id: string) =>
  useQuery({
    queryKey: ['teams', id],
    queryFn: () => http.get<ITeam>(`/api/teams/${id}`),
    enabled: !!id,
  });
  