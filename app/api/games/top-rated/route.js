import { NextResponse } from "next/server";
import { getIGDBToken, igdbFetch } from "../../../../utils/igdbUtils";

export async function GET() {
  try {
    const token = await getIGDBToken();
    if (!token) {
      throw new Error("Failed to retrieve IGDB token");
    }

    const query = `
      fields name, first_release_date, cover.url, rating, total_rating_count, genres.name, platforms.name;
      where rating >= 75
        & total_rating_count >= 100
        & genres != null
        & platforms != null
        & cover != null;
      sort total_rating_count desc;
      limit 50;
    `;

    const games = await igdbFetch(token, query);

    if (!games) {
      throw new Error("Failed to fetch games from IGDB");
    }

    if (games.length === 0) {
      return NextResponse.json(
        { message: "No top-rated games found" },
        { status: 404 }
      );
    }

    const formattedGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString()
        : "TBA",
      coverUrl: game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_1080p")}`
        : null,
      rating: game.rating,
      totalRatings: game.total_rating_count,
      genres: game.genres ? game.genres.map((genre) => genre.name) : [],
      platforms: game.platforms
        ? game.platforms.map((platform) => platform.name)
        : [],
    }));

    return NextResponse.json(formattedGames);
  } catch (error) {
    console.error("Error in /api/games/top-rated:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
