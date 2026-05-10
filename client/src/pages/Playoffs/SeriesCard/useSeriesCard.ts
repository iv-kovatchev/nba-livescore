import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { IPlayoffSeries } from '../Playoffs.types';

export const useSeriesCard = (series: IPlayoffSeries) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { team1, team2, team1Wins, team2Wins, games } = series;

  const hasLiveGame = games.some((g) => g.status === 'live');
  const gamesPlayed = games.filter((g) => g.status === 'final').length;
  const isFinished = team1Wins === 4 || team2Wins === 4;
  const winner: 'team1' | 'team2' | null = team1Wins === 4 ? 'team1' : team2Wins === 4 ? 'team2' : null;

  const getSeriesStatus = (): string => {
    const total = team1Wins + team2Wins;

    if (team1Wins === 4) return `${team1.city} ${team1.name} ${t('playoffs.win')} 4-${team2Wins}`;
    if (team2Wins === 4) return `${team2.city} ${team2.name} ${t('playoffs.win')} 4-${team1Wins}`;
    if (total === 0) return t('playoffs.seriesNotStarted');
    if (team1Wins === team2Wins) return `${t('playoffs.tied')} ${team1Wins}-${team2Wins}`;

    const leader = team1Wins > team2Wins ? team1 : team2;
    const leadWins = Math.max(team1Wins, team2Wins);
    const trailWins = Math.min(team1Wins, team2Wins);
    return `${leader.city} ${leader.name} ${t('playoffs.lead')} ${leadWins}-${trailWins}`;
  };

  const statusLabel = getSeriesStatus();

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