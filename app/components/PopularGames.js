"use client";

import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function PopularGames() {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await fetch("/api/games/popular");
        if (!response.ok) throw new Error("Failed to fetch popular games");
        const data = await response.json();
        setPopularGames(data);
      } catch (error) {
        console.error("Error fetching popular games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularGames();
  }, []);

  if (loading)
    return <p className="text-center text-xl">Loading popular games...</p>;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Most Popular Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
