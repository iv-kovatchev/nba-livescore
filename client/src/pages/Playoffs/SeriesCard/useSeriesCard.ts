import { useNavigate } from 'react-router-dom';
import type { IPlayoffSeries } from '../Playoffs.types';

const getSeriesStatus = (series: IPlayoffSeries): string => {
  const { team1, team2, team1Wins, team2Wins } = series;
  const total = team1Wins + team2Wins;

  if (team1Wins === 4) return `${team1.city} ${team1.name} win 4-${team2Wins}`;
  if (team2Wins === 4) return `${team2.city} ${team2.name} win 4-${team1Wins}`;
  if (total === 0) return 'Series not started';

  if (team1Wins === team2Wins) return `Tied ${team1Wins}-${team2Wins}`;

  const leader = team1Wins > team2Wins ? team1 : team2;
  const leadWins = Math.max(team1Wins, team2Wins);
  const trailWins = Math.min(team1Wins, team2Wins);
  return `${leader.city} ${leader.name} lead ${leadWins}-${trailWins}`;
};

export const useSeriesCard = (series: IPlayoffSeries) => {
  const navigate = useNavigate();
  const { team1, team2, team1Wins, team2Wins, games } = series;

  const hasLiveGame = games.some((g) => g.status === 'live');
  const gamesPlayed = games.filter((g) => g.status === 'final').length;
  const isFinished = team1Wins === 4 || team2Wins === 4;
  const winner: 'team1' | 'team2' | null = team1Wins === 4 ? 'team1' : team2Wins === 4 ? 'team2' : null;
  const statusLabel = getSeriesStatus(series);

  const handleGameClick = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };

  return {
    team1,
    team2,
    team1Wins,
    team2Wins,
    hasLiveGame,
    gamesPlayed,
    isFinished,
    winner,
    statusLabel,
    handleGameClick,
  };
};