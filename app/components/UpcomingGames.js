import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function UpcomingGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games/upcoming");
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming games");
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching upcoming games:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p className="text-center">Loading upcoming games...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p className="text-center">No upcoming games found.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-xl">
      <h2 className="text-3xl font-bold mb-6">Upcoming Games</h2>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="flex space-x-6 pb-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} isUpcoming={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
