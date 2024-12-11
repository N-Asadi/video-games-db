import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function TopRatedGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games/top-rated");
        if (!response.ok) {
          throw new Error("Failed to fetch top-rated games");
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching top-rated games:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading top-rated games...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p className="text-center text-xl">No top-rated games found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-xl min-h-[600px] w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Top Rated Games
      </h2>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex space-x-6 pb-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
