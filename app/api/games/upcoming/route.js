import { NextResponse } from "next/server";
import { getIGDBToken, igdbFetch } from "../../../../utils/igdbUtils";

export async function GET() {
  try {
    const token = await getIGDBToken();
    if (!token) {
      throw new Error("Failed to retrieve IGDB token");
    }

    // Calculate exact 2 months from current date
    const now = new Date();
    const twoMonthsLater = new Date(
      now.getFullYear(),
      now.getMonth() + 2,
      now.getDate()
    );

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const twoMonthsLaterTimestamp = Math.floor(twoMonthsLater.getTime() / 1000);

    console.log("Date range:", {
      from: new Date(currentTimestamp * 1000).toISOString(),
      to: new Date(twoMonthsLaterTimestamp * 1000).toISOString(),
    });

    const query = `
      fields name, first_release_date, cover.url, rating, total_rating_count, genres.name, platforms.name;
      where first_release_date > ${currentTimestamp}
      & first_release_date <= ${twoMonthsLaterTimestamp}
      & cover != null
      & platforms != null;
      sort first_release_date asc;
      limit 50;
    `;

    const games = await igdbFetch(token, query);

    if (!games) {
      throw new Error("Failed to fetch games from IGDB");
    }

    if (games.length === 0) {
      return NextResponse.json(
        { message: "No upcoming games found" },
        { status: 404 }
      );
    }

    const formattedGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      releaseDate: new Date(
        game.first_release_date * 1000
      ).toLocaleDateString(),
      coverUrl: game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
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
    console.error("Error in /api/games/upcoming:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
