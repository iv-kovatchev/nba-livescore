import { useTranslation } from "react-i18next";
import type { ITeamPlayer } from "../TeamDetails.types";
import "./TeamRoster.scss";
import useTeamRoster from "./useTeamRoster";

interface TeamRosterProps {
  players: ITeamPlayer[];
  loading: boolean;
  teamColor: string;
}

const TeamRoster = ({ players, loading, teamColor }: TeamRosterProps) => {
  const { t } = useTranslation();
  const { getInitials } = useTeamRoster();

  if (loading) {
    return <div className="team-roster__loading">{t('teams.rosterLoading')}</div>;
  }

  return (
    <div className="team-roster">
      <h2 className="team-roster__title">{t('teams.roster')}</h2>
      <div className="team-roster__table-wrapper">
        <table className="team-roster__table">
          <thead>
            <tr>
              <th className="team-roster__num">{t('teams.number')}</th>
              <th className="team-roster__player-col">{t('teams.player')}</th>
              <th>{t('teams.position')}</th>
              <th>{t('teams.height')}</th>
              <th>{t('teams.weight')}</th>
              <th>{t('teams.country')}</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player._id}>
                <td className="team-roster__num">
                  {player.jerseyNumber ?? "—"}
                </td>
                <td className="team-roster__player-cell">
                  <div
                    className="team-roster__avatar"
                    style={{ "--team-color": teamColor } as React.CSSProperties}
                  >
                    {player.photoUrl ? (
                      <img src={player.photoUrl} alt={`${player.firstName} ${player.lastName}`} />
                    ) : (
                      getInitials(player.firstName, player.lastName)
                    )}
                  </div>
                  <span className="team-roster__player-name">
                    {player.firstName} {player.lastName}
                  </span>
                </td>
                <td className="team-roster__position">{player.position || "—"}</td>
                <td>{player.height || "—"}</td>
                <td>{player.weight ? `${player.weight} lbs` : "—"}</td>
                <td>{player.nationality || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamRoster;