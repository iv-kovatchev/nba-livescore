import { useMemo, useState } from 'react';
import type { IPlayoffSeries } from './Playoffs.types';
import { usePlayoffsSeries } from '../../api/games/usePlayoffsSeries';

export interface IPlayoffRound {
  labelKey: string;
  series: IPlayoffSeries[];
}

const ROUND_ORDER = ['playoffs.firstRound', 'playoffs.secondRound', 'playoffs.conferenceFinals', 'playoffs.nbaFinals'];

const detectRound = (series: IPlayoffSeries): string => {
  if (series.games.length === 0) return 'playoffs.firstRound';
  const earliest = new Date(series.games[0].date);
  const month = earliest.getUTCMonth();

  if (month === 3) return 'playoffs.firstRound';
  if (month === 4) {
    const day = earliest.getUTCDate();
    if (day <= 20) return 'playoffs.secondRound';
    return 'playoffs.conferenceFinals';
  }
  return 'playoffs.nbaFinals';
};

const groupByRound = (allSeries: IPlayoffSeries[]): IPlayoffRound[] => {
  const map: Record<string, IPlayoffSeries[]> = {};

  for (const s of allSeries) {
    const round = detectRound(s);
    if (!map[round]) map[round] = [];
    map[round].push(s);
  }

  return ROUND_ORDER.filter((r) => map[r]).map((r) => ({ labelKey: r, series: map[r] }));
};

export const usePlayoffs = () => {
  const { data = [], isLoading, isError } = usePlayoffsSeries();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const rounds = useMemo(() => groupByRound(data), [data]);

  const handleExpand = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return { rounds, isLoading, isError, expandedKey, handleExpand };
};