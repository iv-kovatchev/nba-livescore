import Team from '../models/Team';
import Game from '../models/Game';
import { ballDontLieService } from './balldontlie';

const mapStatus = (status: string): 'scheduled' | 'live' | 'final' => {
  if (status === 'Final') return 'final';
  if (status.includes('Qtr') || status.includes('Half') || status.includes('OT')) return 'live';
  return 'scheduled';
};

export const syncGamesByDate = async (date: string) => {
  const externalGames = await ballDontLieService.getGamesByDate(date);

  for (const eg of externalGames) {
    const homeTeam = await Team.findOne({ externalId: eg.home_team.id });
    const awayTeam = await Team.findOne({ externalId: eg.visitor_team.id });

    if (!homeTeam || !awayTeam) continue;

    const status = mapStatus(eg.status);

    await Game.findOneAndUpdate(
      { externalId: eg.id },
      {
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
        homeScore: eg.home_team_score,
        awayScore: eg.visitor_team_score,
        date: new Date(eg.datetime),
        status,
        quarter: eg.period ?? 0,
        clock: eg.time ?? '',
        arena: homeTeam.arena,
        externalId: eg.id,
      },
      { upsert: true, returnDocument: 'after' }
    );
  }

  console.log(`Synced ${externalGames.length} games for ${date}`);
};