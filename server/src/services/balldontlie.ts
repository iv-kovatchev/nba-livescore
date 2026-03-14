const BASE_URL = "https://api.balldontlie.io/nba/v1";

export const ballDontLieService = {
  getGamesByDate: async (date: string) => {
    const res = await fetch(`${BASE_URL}/games?dates[]=${date}&per_page=25`, {
      headers: { Authorization: process.env.BALLDONTLIE_API_KEY as string },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  },

  getStandings: async (season: number) => {
    const res = await fetch(`${BASE_URL}/standings?season=${season}`, {
      headers: { Authorization: process.env.BALLDONTLIE_API_KEY as string },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  },
};