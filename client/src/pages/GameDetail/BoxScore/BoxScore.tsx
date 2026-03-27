import { useState } from "react";
import "./BoxScore.scss";
import type { IGameDetailTeam, IPlayerStat } from "../GameDetail.types";
import Tooltip from "../../../components/Tooltip/Tooltip";

interface BoxScoreProps {
  stats: IPlayerStat[];
  loading: boolean;
  homeTeam: IGameDetailTeam;
  awayTeam: IGameDetailTeam;
}

const BoxScore = ({ stats, loading, homeTeam, awayTeam }: BoxScoreProps) => {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  const homeStats = stats.filter(
    (s) => s.team.abbreviation === homeTeam.abbreviation,
  );
  const awayStats = stats.filter(
    (s) => s.team.abbreviation === awayTeam.abbreviation,
  );
  const activeStats = activeTab === "home" ? homeStats : awayStats;

  const sortedStats = [...activeStats].sort((a, b) => b.pts - a.pts);

  return (
    <div className="box-score">
      <h3 className="box-score__title">Box Score</h3>

      <div className="box-score__tabs">
        <button
          className={`box-score__tab ${activeTab === "home" ? "box-score__tab--active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          <img
            src={homeTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${homeTeam.abbreviation.toLowerCase()}.png`}
            alt={homeTeam.name}
            className="box-score__tab-logo"
          />
          {homeTeam.city} {homeTeam.name}
        </button>
        <button
          className={`box-score__tab ${activeTab === "away" ? "box-score__tab--active" : ""}`}
          onClick={() => setActiveTab("away")}
        >
          <img
            src={awayTeam.logo ?? `https://a.espncdn.com/i/teamlogos/nba/500/${awayTeam.abbreviation.toLowerCase()}.png`}
            alt={awayTeam.name}
            className="box-score__tab-logo"
          />
          {awayTeam.city} {awayTeam.name}
        </button>
      </div>

      {loading ? (
        <div className="box-score__loading">Loading stats...</div>
      ) : sortedStats.length === 0 ? (
        <div className="box-score__empty">No stats available</div>
      ) : (
        <div className="box-score__table-wrapper">
          <table className="box-score__table">
            <thead>
              <tr>
                <th className="box-score__player-col">Player</th>
                <th>
                  <Tooltip text="Minutes Played">MIN</Tooltip>
                </th>
                <th>
                  <Tooltip text="Points">PTS</Tooltip>
                </th>
                <th>
                  <Tooltip text="Rebounds">REB</Tooltip>
                </th>
                <th>
                  <Tooltip text="Assists">AST</Tooltip>
                </th>
                <th>
                  <Tooltip text="Steals">STL</Tooltip>
                </th>
                <th>
                  <Tooltip text="Blocks">BLK</Tooltip>
                </th>
                <th>
                  <Tooltip text="Field Goals Made / Attempted">FG</Tooltip>
                </th>
                <th>
                  <Tooltip text="3-Pointers Made / Attempted">3P</Tooltip>
                </th>
                <th>
                  <Tooltip text="Free Throws Made / Attempted">FT</Tooltip>
                </th>
                <th>
                  <Tooltip maxWidth={200} text="Plus / Minus — team point differential while player is on court">
                    +/-
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat) => (
                <tr key={stat.id}>
                  <td className="box-score__player-cell">
                    <span className="box-score__jersey">
                      #{stat.player.jerseyNumber}
                    </span>
                    <span className="box-score__player-name">
                      {stat.player.firstName
                        ? `${stat.player.firstName[0]}.`
                        : ""}{" "}
                      {stat.player.lastName}
                    </span>
                    <span className="box-score__position">
                      {stat.player.position}
                    </span>
                  </td>
                  <td>{stat.min}</td>
                  <td className="box-score__pts">{stat.pts}</td>
                  <td>{stat.reb}</td>
                  <td>{stat.ast}</td>
                  <td>{stat.stl}</td>
                  <td>{stat.blk}</td>
                  <td>
                    {stat.fgm}/{stat.fga}
                  </td>
                  <td>
                    {stat.fg3m}/{stat.fg3a}
                  </td>
                  <td>
                    {stat.ftm}/{stat.fta}
                  </td>
                  <td
                    className={`box-score__plus-minus ${stat.plus_minus > 0 ? "box-score__plus-minus--pos" : stat.plus_minus < 0 ? "box-score__plus-minus--neg" : ""}`}
                  >
                    {stat.plus_minus > 0
                      ? `+${stat.plus_minus}`
                      : stat.plus_minus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BoxScore;
