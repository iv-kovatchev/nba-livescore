import { useTranslation } from "react-i18next";
import type { ITeamDetailsArena } from "../TeamDetails.types";
import "./TeamArena.scss";

interface TeamArenaProps {
  arena: ITeamDetailsArena;
  teamColor: string;
}

const TeamArena = ({ arena, teamColor }: TeamArenaProps) => {
  const { t } = useTranslation();

  return (
    <div className="team-arena" style={{ "--team-color": teamColor } as React.CSSProperties}>
      <h2 className="team-arena__title">{t('teams.arena')}</h2>
      <div className="team-arena__card">
        <div className="team-arena__photo-wrapper">
          {arena.photoUrl ? (
            <img src={arena.photoUrl} alt={arena.name} className="team-arena__photo" />
          ) : (
            <div className="team-arena__photo-placeholder">
              <span>{arena.name}</span>
            </div>
          )}
        </div>
        <div className="team-arena__info">
          <h3 className="team-arena__name">{arena.name}</h3>
          <p className="team-arena__location">{arena.city}, {arena.state}</p>
          <div className="team-arena__stats">
            <div className="team-arena__stat">
              <span className="team-arena__stat-label">{t('teams.capacity')}</span>
              <span className="team-arena__stat-value">{arena.capacity.toLocaleString()}</span>
            </div>
            <div className="team-arena__stat">
              <span className="team-arena__stat-label">{t('teams.yearBuilt')}</span>
              <span className="team-arena__stat-value">{arena.yearBuilt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamArena;
