import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./PlayerModal.scss";
import type { IPlayer } from "../Players.types";
import { FiX } from "../../../components/Icons";

interface PlayerModalProps {
  player: IPlayer;
  onClose: () => void;
}

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`.toUpperCase();

const formatBirthDate = (birthDate: string, locale: string) => {
  if (!birthDate) return "—";
  return new Date(birthDate).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const calculateAge = (birthDate: string) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const PlayerModal = ({ player, onClose }: PlayerModalProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const age = calculateAge(player.birthDate);

  return (
    <div className="player-modal__overlay" onClick={onClose}>
      <div
        className="player-modal"
        onClick={e => e.stopPropagation()}
        style={{
          "--team-color-primary": player.team.colors[0],
          "--team-color-secondary": player.team.colors[1],
        } as React.CSSProperties}
      >
        <button className="player-modal__close" onClick={onClose}>
          <FiX size={20} />
        </button>

        <div className="player-modal__accent" />

        <div className="player-modal__header">
          <div className="player-modal__avatar">
            {player.photoUrl ? (
              <img src={player.photoUrl} alt={`${player.firstName} ${player.lastName}`} />
            ) : (
              getInitials(player.firstName, player.lastName)
            )}
          </div>
          <div className="player-modal__header-info">
            <h2 className="player-modal__name">
              {player.firstName} {player.lastName}
            </h2>
            {player.jerseyNumber !== null && (
              <span className="player-modal__jersey">#{player.jerseyNumber}</span>
            )}
            <button
              className="player-modal__team"
              onClick={() => { navigate(`/teams/${player.team._id}`); onClose(); }}
            >
              <img
                src={player.team.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${player.team.abbreviation.toLowerCase()}.png`}
                alt={player.team.name}
                className="player-modal__team-logo"
              />
              {player.team.city} {player.team.name}
            </button>
          </div>
        </div>

        <div className="player-modal__stats">
          <div className="player-modal__stat">
            <span className="player-modal__stat-label">{t('players.modalPosition')}</span>
            <span className="player-modal__stat-value">{player.position || "—"}</span>
          </div>
          <div className="player-modal__stat">
            <span className="player-modal__stat-label">{t('players.modalHeight')}</span>
            <span className="player-modal__stat-value">{player.height || "—"}</span>
          </div>
          <div className="player-modal__stat">
            <span className="player-modal__stat-label">{t('players.modalWeight')}</span>
            <span className="player-modal__stat-value">{player.weight ? `${player.weight} lbs` : "—"}</span>
          </div>
          <div className="player-modal__stat">
            <span className="player-modal__stat-label">{t('players.modalNationality')}</span>
            <span className="player-modal__stat-value">{player.nationality || "—"}</span>
          </div>
          <div className="player-modal__stat">
            <span className="player-modal__stat-label">{t('players.modalBorn')}</span>
            <span className="player-modal__stat-value">
              {formatBirthDate(player.birthDate, i18n.language === 'bg' ? 'bg-BG' : 'en-US')}
              {age && <span className="player-modal__age"> ({age} {t('players.yrs')})</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;