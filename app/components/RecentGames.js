import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function RecentGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games/recent");
        if (!response.ok) {
          throw new Error("Failed to fetch recent games");
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching recent games:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading recent games...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p className="text-center text-xl">No recent games found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-xl min-h-[600px]">
      <h2 className="text-3xl font-bold mb-8 px-4">Recent Releases</h2>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 pb-6 px-4 min-w-full">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
