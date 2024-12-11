import { NextResponse } from "next/server";
import { getIGDBToken, igdbFetch } from "../../../utils/igdbUtils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const sort = searchParams.get("sort") || "total_rating_count";
  const order = searchParams.get("order") || "desc";
  const filter = searchParams.get("filter") || "";
  const offset = (page - 1) * limit;

  try {
    const token = await getIGDBToken();
    if (!token) {
      console.error("IGDB token is missing");
      return NextResponse.json(
        { error: "Failed to retrieve IGDB token" },
        { status: 500 }
      );
    }

    let baseQuery =
      "fields name, first_release_date, cover.url, rating, total_rating_count, genres.name, platforms.name;";
    let whereClause = "where cover != null";

    if (search) {
      whereClause += ` & name ~ *"${search}"*`;
    }

    if (filter) {
      if (filter === "#") {
        whereClause += ` & name ~ "^[0-9]"`;
      } else {
        whereClause += ` & name ~ "${filter}"*`;
      }
    }

    let query = `${baseQuery} ${whereClause};`;

    query += ` sort ${sort} ${order};`;
    query += ` limit ${limit}; offset ${offset};`;

    console.log("IGDB Query:", query);

    const games = await igdbFetch(token, query);

    if (!games || games.length === 0) {
      return NextResponse.json({ games: [] });
    }

    const formattedGames = games.map((game) => ({
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
    }));

    return NextResponse.json({ games: formattedGames });
  } catch (error) {
    console.error("Error in /api/games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games: " + error.message },
      { status: 500 }
    );
  }
}
