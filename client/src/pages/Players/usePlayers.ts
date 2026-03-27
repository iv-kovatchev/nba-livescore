import { useState, useMemo } from "react";
import { usePlayers as usePlayersQuery } from "../../api/players/usePlayers";

export const usePlayers = () => {
  const { data: players = [], isLoading } = usePlayersQuery();
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(search.toLowerCase());
      const matchesPosition = positionFilter
        ? p.position.includes(positionFilter)
        : true;
      const matchesTeam = teamFilter ? p.team._id === teamFilter : true;
      return matchesSearch && matchesPosition && matchesTeam;
    });
  }, [players, search, positionFilter, teamFilter]);

  const teams = useMemo(() => {
    const unique = new Map(players.map((p) => [p.team._id, p.team]));
    return Array.from(unique.values()).sort((a, b) =>
      `${a.city} ${a.name}`.localeCompare(`${b.city} ${b.name}`),
    );
  }, [players]);

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const setSearchAndReset = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const setPositionFilterAndReset = (value: string) => {
    setPositionFilter(value);
    setPage(1);
  };

  const setTeamFilterAndReset = (value: string) => {
    setTeamFilter(value);
    setPage(1);
  };

  return {
    paginatedPlayers: paginated,
    totalPages,
    page,
    setPage,
    players: filtered,
    isLoading,
    search,
    positionFilter,
    teamFilter,
    teams,
    setSearchAndReset,
    setPositionFilterAndReset,
    setTeamFilterAndReset,
  };
};
