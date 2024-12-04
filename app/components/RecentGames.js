"use client";

import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function RecentGames() {
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentGames = async () => {
      try {
        const response = await fetch("/api/games/recent");
        if (!response.ok) throw new Error("Failed to fetch recent games");
        const data = await response.json();
        setRecentGames(data);
      } catch (error) {
        console.error("Error fetching recent games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentGames();
  }, []);

  if (loading)
    return <p className="text-center text-xl">Loading recent games...</p>;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Recent Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
