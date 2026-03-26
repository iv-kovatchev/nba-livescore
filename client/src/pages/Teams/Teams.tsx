import { useTeams } from "../../api/teams/useTeams";
import TeamCard from "./TeamCard/TeamCard";

import "./Teams.scss";

const DIVISIONS = {
  East: ["Atlantic", "Central", "Southeast"],
  West: ["Northwest", "Pacific", "Southwest"],
};

const Teams = () => {
  const { data: teams, isLoading } = useTeams();

  if (isLoading) {
    return <div className="teams__loading">Loading teams...</div>;
  }

  if (!teams) return null;

  return (
    <div className="teams">
      <h1 className="teams__title">NBA Teams</h1>
      <p className="teams__subtitle">2025-26 Season</p>
      {Object.entries(DIVISIONS).map(([conference, divisions]) => (
        <div key={conference} className="teams__conference">
          <h2 className="teams__conference-title">
            {conference === "East" ? "Eastern" : "Western"} Conference
          </h2>
          {divisions.map((division) => {
            const divisionTeams = teams.filter((t) => t.division === division);
            return (
              <div key={division} className="teams__division">
                <h3 className="teams__division-title">{division}</h3>
                <div className="teams__grid">
                  {divisionTeams.map((team) => (
                    <TeamCard key={team._id} team={team} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Teams;
