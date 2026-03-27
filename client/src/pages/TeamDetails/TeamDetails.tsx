import { useNavigate } from "react-router-dom";
import "./TeamDetails.scss";
import { FiChevronLeft } from "../../components/Icons";
import TeamArena from "./TeamArena/TeamArena";
import { useTeamDetails } from "./useTeamDetails";
import TeamHeader from "./TeamHeader/TeamHeader";
import TeamRoster from "./TeamRoster/TeamRoster";

const TeamDetails = () => {
  const navigate = useNavigate();
  const { team, isLoading, loadingPlayers, players } = useTeamDetails();

  if (isLoading) {
    return <div className="team-details__loading">Loading...</div>;
  }

  if (!team) {
    return <div className="team-details__error">Team not found</div>;
  }

  return (
    <div className="team-details">
      <button className="team-details__back" onClick={() => navigate(-1)}>
        <FiChevronLeft size={20} />
        Back
      </button>
      <TeamHeader team={team} />
      <TeamArena arena={team.arena} teamColor={team.colors[0]} />
      <TeamRoster players={players} loading={loadingPlayers} teamColor={team.colors[0]} />
    </div>
  );
};

export default TeamDetails;
