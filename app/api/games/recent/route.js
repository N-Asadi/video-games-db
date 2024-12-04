import { NextResponse } from "next/server";
import { getIGDBToken, igdbFetch } from "@/utils/igdbUtils";

export async function GET() {
  try {
    const token = await getIGDBToken();
    if (!token) {
      console.error("IGDB token is missing");
      return NextResponse.json(
        { error: "Failed to retrieve IGDB token" },
        { status: 500 }
      );
    }

    const currentDate = Math.floor(Date.now() / 1000);
    const sixMonthsAgo = currentDate - 15778800; // Approximately 6 months in seconds

    const query = `
      fields name, first_release_date, cover.url, rating, total_rating_count;
      where first_release_date >= ${sixMonthsAgo} & first_release_date <= ${currentDate} & total_rating_count > 5;
      sort first_release_date desc;
      limit 12;
    `;

    const games = await igdbFetch(token, query);

    if (!games || games.length === 0) {
      console.error("No games returned from IGDB");
      return NextResponse.json(
        { error: "No recent games found" },
        { status: 404 }
      );
    }

    const formattedGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      releaseDate: new Date(
        game.first_release_date * 1000
      ).toLocaleDateString(),
      coverUrl: game.cover?.url
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : null,
      rating: game.rating,
      totalRatings: game.total_rating_count,
    }));

    return NextResponse.json(formattedGames);
  } catch (error) {
    console.error("Error in /api/games/recent:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch recent games" },
      { status: 500 }
    );
  }
}
