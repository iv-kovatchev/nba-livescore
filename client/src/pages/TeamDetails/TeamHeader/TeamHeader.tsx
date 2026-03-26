import type { ITeamDetails } from "../TeamDetails.types";
import "./TeamHeader.scss";

interface TeamHeaderProps {
  team: ITeamDetails;
}

const TeamHeader = ({ team }: TeamHeaderProps) => {
  return (
    <div
      className="team-header"
      style={{
        "--team-color-primary": team.colors[0],
        "--team-color-secondary": team.colors[1],
      } as React.CSSProperties}
    >
      <div className="team-header__accent" />
      <div className="team-header__content">
        <div className="team-header__logo-wrapper">
          <img
            src={team.logoUrl ?? `https://a.espncdn.com/i/teamlogos/nba/500/${team.abbreviation.toLowerCase()}.png`}
            alt={team.name}
            className="team-header__logo"
          />
        </div>
        <div className="team-header__info">
          <span className="team-header__city">{team.city}</span>
          <h1 className="team-header__name">{team.name}</h1>
          <div className="team-header__meta">
            <span className="team-header__badge">
              {team.conference === "East" ? "Eastern" : "Western"} Conference
            </span>
            <span className="team-header__badge">{team.division}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;