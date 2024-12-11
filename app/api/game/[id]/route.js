import { NextResponse } from "next/server";
import { getIGDBToken, igdbFetch } from "../../../../utils/igdbUtils";

export async function GET(request, { params }) {
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
      fields name, first_release_date, cover.url, rating, total_rating_count, genres.name, platforms.name, summary, storyline, screenshots.url, videos.video_id;
      where id = ${params.id};
    `;

    const games = await igdbFetch(token, query);

    if (!games || games.length === 0) {
      console.error("No game returned from IGDB");
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const game = games[0];

    const formattedGame = {
      id: game.id,
      name: game.name,
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString()
        : "Unknown",
      coverUrl: game.cover?.url
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : null,
      rating: game.rating,
      totalRatings: game.total_rating_count,
      genres: game.genres?.map((genre) => genre.name) || [],
      platforms: game.platforms?.map((platform) => platform.name) || [],
      summary: game.summary,
      storyline: game.storyline,
      screenshots:
        game.screenshots?.map(
          (screenshot) =>
            `https:${screenshot.url.replace("t_thumb", "t_screenshot_big")}`
        ) || [],
      videos:
        game.videos?.map(
          (video) => `https://www.youtube.com/watch?v=${video.video_id}`
        ) || [],
    };

    return NextResponse.json(formattedGame);
  } catch (error) {
    console.error("Error in /api/game/[id]:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch game details" },
      { status: 500 }
    );
  }
}
