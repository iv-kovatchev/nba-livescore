import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      <h3 className="box-score__title">{t('gameDetail.boxScore')}</h3>

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
        <div className="box-score__loading">{t('gameDetail.loadingStats')}</div>
      ) : sortedStats.length === 0 ? (
        <div className="box-score__empty">{t('gameDetail.noStats')}</div>
      ) : (
        <div className="box-score__table-wrapper">
          <table className="box-score__table">
            <thead>
              <tr>
                <th className="box-score__player-col">{t('gameDetail.player')}</th>
                <th>
                  <Tooltip text={t('gameDetail.minutesPlayed')}>MIN</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.points')}>PTS</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.rebounds')}>REB</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.assists')}>AST</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.steals')}>STL</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.blocks')}>BLK</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.fieldGoals')}>FG</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.threePointers')}>3P</Tooltip>
                </th>
                <th>
                  <Tooltip text={t('gameDetail.freeThrows')}>FT</Tooltip>
                </th>
                <th>
                  <Tooltip maxWidth={200} text={t('gameDetail.plusMinus')}>+/-</Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat) => (
                <tr key={stat.player.externalId}>
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
                  <td>{stat.fgm}/{stat.fga}</td>
                  <td>{stat.fg3m}/{stat.fg3a}</td>
                  <td>{stat.ftm}/{stat.fta}</td>
                  <td
                    className={`box-score__plus-minus ${stat.plus_minus > 0 ? "box-score__plus-minus--pos" : stat.plus_minus < 0 ? "box-score__plus-minus--neg" : ""}`}
                  >
                    {stat.plus_minus > 0 ? `+${stat.plus_minus}` : stat.plus_minus}
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
