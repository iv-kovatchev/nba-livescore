import { useState } from 'react';
import { useGamesByDate } from "../../api/games/useGamesByDate";
import GameCard from "./GameCard/GameCard";
import './Games.scss';
import type { IGame } from "./Games.types";
import { formatDisplayDate, getLocalDate } from '../../utils/dateUtils';
import { FiChevronLeft, FiChevronRight } from '../../components/Icons';

const Games = () => {
  const [dateOffset, setDateOffset] = useState(0);
  const date = getLocalDate(dateOffset);
  const { data: games, isLoading, isError } = useGamesByDate(date);

  const liveGames = games?.filter((g: IGame) => g.status === 'live') ?? [];
  const finalGames = games?.filter((g: IGame) => g.status === 'final') ?? [];
  const scheduledGames = games?.filter((g: IGame) => g.status === 'scheduled') ?? [];

  return (
    <div className="games">
      <div className="games__header">
        <h1 className="games__title">Games</h1>
        <div className="games__date-nav">
          <button className="games__date-btn" onClick={() => setDateOffset(prev => prev - 1)}>
            <FiChevronLeft />
          </button>
          <span className="games__date">
            {dateOffset === 0 ? 'Today' : formatDisplayDate(date)}
          </span>
          <button className="games__date-btn" onClick={() => setDateOffset(prev => prev + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      {isLoading && <div className="games__state">Loading...</div>}
      {isError && <div className="games__state">Something went wrong.</div>}
      {!isLoading && !isError && !games?.length && <div className="games__state">No games on this date.</div>}

      {liveGames.length > 0 && (
        <section className="games__section">
          <h2 className="games__section-title games__section-title--live">
            <span className="games__live-dot" />
            Live Now
          </h2>
          <div className="games__grid">
            {liveGames.map((game: IGame) => <GameCard key={game._id} game={game} />)}
          </div>
        </section>
      )}

      {finalGames.length > 0 && (
        <section className="games__section">
          <h2 className="games__section-title">Final</h2>
          <div className="games__grid">
            {finalGames.map((game: IGame) => <GameCard key={game._id} game={game} />)}
          </div>
        </section>
      )}

      {scheduledGames.length > 0 && (
        <section className="games__section">
          <h2 className="games__section-title">Upcoming</h2>
          <div className="games__grid">
            {scheduledGames.map((game: IGame) => <GameCard key={game._id} game={game} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default Games;