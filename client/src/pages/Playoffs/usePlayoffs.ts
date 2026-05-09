import { useMemo, useState } from 'react';
import type { IPlayoffSeries } from './Playoffs.types';
import { usePlayoffsSeries } from '../../api/games/usePlayoffsSeries';

interface IPlayoffRound {
  label: string;
  series: IPlayoffSeries[];
}

const ROUND_ORDER = ['First Round', 'Second Round', 'Conference Finals', 'NBA Finals'];

const detectRound = (series: IPlayoffSeries): string => {
  if (series.games.length === 0) return 'First Round';
  const earliest = new Date(series.games[0].date);
  const month = earliest.getUTCMonth();

  if (month === 3) return 'First Round';
  if (month === 4) {
    const day = earliest.getUTCDate();
    if (day <= 20) return 'Second Round';
    return 'Conference Finals';
  }
  return 'NBA Finals';
};

const groupByRound = (allSeries: IPlayoffSeries[]): IPlayoffRound[] => {
  const map: Record<string, IPlayoffSeries[]> = {};

  for (const s of allSeries) {
    const round = detectRound(s);
    if (!map[round]) map[round] = [];
    map[round].push(s);
  }

  return ROUND_ORDER.filter((r) => map[r]).map((r) => ({ label: r, series: map[r] }));
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