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
      const errorBody = await response.text();
      throw new Error(
        `Failed to obtain IGDB token. Status: ${response.status}, Body: ${errorBody}`
      );
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
    console.log("IGDB Fetch - Query:", query); // Log the query being sent

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body: query,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("IGDB Fetch - Error Response:", errorBody); // Log the error response
      throw new Error(
        `Failed to fetch data from IGDB. Status: ${response.status}, Body: ${errorBody}`
      );
    }

    const data = await response.json();
    console.log("IGDB Fetch - Response:", data); // Log the successful response
    return data;
  } catch (error) {
    console.error("Error fetching data from IGDB:", error);
    throw error; // Re-throw the error to be handled in the API route
  }
}
