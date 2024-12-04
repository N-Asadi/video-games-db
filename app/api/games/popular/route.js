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

    const query = `
      fields name, first_release_date, cover.url, rating, total_rating_count;
      where rating != null & total_rating_count > 100;
      sort total_rating_count desc;
      limit 12;
    `;

    const games = await igdbFetch(token, query);

    if (!games || games.length === 0) {
      console.error("No games returned from IGDB");
      return NextResponse.json(
        { error: "No popular games found" },
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
    console.error("Error in /api/games/popular:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch popular games" },
      { status: 500 }
    );
  }
}
