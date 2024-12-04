const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET;

export async function getIGDBToken() {
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to obtain IGDB token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting IGDB token:", error);
    return null;
  }
}

export async function igdbFetch(token, query) {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from IGDB");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from IGDB:", error);
    return null;
  }
}
