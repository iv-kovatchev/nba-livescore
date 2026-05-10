import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePlayers } from "./usePlayers";
import type { IPlayer } from "./Players.types";
import "./Players.scss";
import PlayerModal from "./PlayerModal/PlayerModal";
import { FiChevronLeft, FiChevronRight } from "../../components/Icons";

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`.toUpperCase();

const Players = () => {
  const { t } = useTranslation();
  const {
    players,
    isLoading,
    search,
    positionFilter,
    teamFilter,
    teams,
    page,
    setPage,
    totalPages,
    paginatedPlayers,
    setPositionFilterAndReset,
    setSearchAndReset,
    setTeamFilterAndReset,
  } = usePlayers();

  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);

  if (isLoading) {
    return <div className="players__loading">{t('players.loading')}</div>;
  }

  return (
    <div className="players">
      <h1 className="players__title">{t('players.title')}</h1>
      <p className="players__subtitle">{players.length} {t('players.title').toLowerCase()}</p>

      <div className="players__filters">
        <input
          className="players__search"
          type="text"
          placeholder={t('players.searchPlaceholder')}
          value={search}
          onChange={(e) => setSearchAndReset(e.target.value)}
        />
        <select
          className="players__select"
          value={positionFilter}
          onChange={(e) => setPositionFilterAndReset(e.target.value)}
        >
          <option value="">{t('players.allPositions')}</option>
          <option value="G">{t('players.guard')}</option>
          <option value="F">{t('players.forward')}</option>
          <option value="C">{t('players.center')}</option>
        </select>
        <select
          className="players__select"
          value={teamFilter}
          onChange={(e) => setTeamFilterAndReset(e.target.value)}
        >
          <option value="">{t('players.allTeams')}</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.city} {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="players__table-wrapper">
        <table className="players__table">
          <thead>
            <tr>
              <th className="players__player-col">{t('players.player')}</th>
              <th>{t('players.team')}</th>
              <th>{t('players.position')}</th>
              <th className="players__hide-mobile">{t('players.number')}</th>
              <th className="players__hide-mobile">{t('players.height')}</th>
              <th className="players__hide-mobile">{t('players.nationality')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlayers.map((player) => (
              <tr key={player._id} onClick={() => setSelectedPlayer(player)}>
                <td>
                  <div className="players__player-cell">
                    <div
                      className="players__avatar"
                      style={{ "--team-color": player.team.colors[0] } as React.CSSProperties}
                    >
                      {player.photoUrl ? (
                        <img
                          src={player.photoUrl}
                          alt={`${player.firstName} ${player.lastName}`}
                        />
                      ) : (
                        getInitials(player.firstName, player.lastName)
                      )}
                    </div>
                    <span className="players__player-name">
                      {player.firstName} {player.lastName}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="players__team-cell">
                    <img
                      src={player.team.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${player.team.abbreviation.toLowerCase()}.png`}
                      alt={player.team.name}
                      className="players__team-logo"
                    />
                    <span className="players__hide-mobile">
                      {player.team.city} {player.team.name}
                    </span>
                  </div>
                </td>
                <td className="players__position">{player.position || "—"}</td>
                <td className="players__hide-mobile">
                  {player.jerseyNumber ?? "—"}
                </td>
                <td className="players__hide-mobile">{player.height || "—"}</td>
                <td className="players__hide-mobile">
                  {player.nationality || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="players__pagination">
          <button
            className="players__page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <FiChevronLeft />
          </button>
          <span className="players__page-info">
            {page} / {totalPages}
          </span>
          <button
            className="players__page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default Players;