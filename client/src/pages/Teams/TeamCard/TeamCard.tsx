import { useNavigate } from "react-router-dom";
import type { ITeam } from "../Teams.types";

import "./TeamCard.scss";

const TeamCard = ({ team }: { team: ITeam }) => {
  const navigate = useNavigate();

  return (
    <div
      className="team-card"
      onClick={() => navigate(`/teams/${team._id}`)}
      style={{ "--team-color": team.colors[0] } as React.CSSProperties}
    >
      <div className="team-card__logo-wrapper">
        <img
          src={team.logoUrl ?? `https://a.espncdn.com/i/teamlogos/nba/500/${team.abbreviation.toLowerCase()}.png`}
          alt={team.name}
          className="team-card__logo"
        />
      </div>
      <div className="team-card__info">
        <span className="team-card__city">{team.city}</span>
        <span className="team-card__name">{team.name}</span>
      </div>
    </div>
  );
};

export default TeamCard;
