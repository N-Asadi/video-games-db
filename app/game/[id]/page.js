"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { use } from "react";
import { Star, Calendar, Gamepad, Tag } from "lucide-react";

export default function GamePage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/game/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-2xl mt-8 text-red-500">Error: {error}</p>
    );
  }

  if (!game) {
    return (
      <p className="text-center text-2xl mt-8 text-red-500">Game not found</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {game.coverUrl && (
            <Image
              src={game.coverUrl}
              alt={`${game.name} cover`}
              width={500}
              height={700}
              className="rounded-lg shadow-lg"
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            {game.name}
          </h1>
          <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 mr-2" />
            <p className="text-xl">
              {new Date(game.releaseDate) > new Date()
                ? "Releases"
                : "Released"}
              : {game.releaseDate}
            </p>
          </div>
          {game.rating && (
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {game.rating.toFixed(1)}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">
                ({game.totalRatings.toLocaleString()} ratings)
              </span>
            </div>
          )}
          {game.genres && game.genres.length > 0 && (
            <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
              <Tag className="w-5 h-5 mr-2" />
              <p className="text-lg">
                <span className="font-semibold">Genres:</span>{" "}
                {game.genres.join(", ")}
              </p>
            </div>
          )}
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
              <Gamepad className="w-5 h-5 mr-2" />
              <p className="text-lg">
                <span className="font-semibold">Platforms:</span>{" "}
                {game.platforms.join(", ")}
              </p>
            </div>
          )}
          {game.summary && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{game.summary}</p>
            </div>
          )}
          {game.storyline && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                Storyline
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {game.storyline}
              </p>
            </div>
          )}
        </div>
      </div>
      {game.screenshots && game.screenshots.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
            Screenshots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {game.screenshots.map((screenshot, index) => (
              <Image
                key={index}
                src={screenshot}
                alt={`${game.name} screenshot ${index + 1}`}
                width={400}
                height={225}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}
      {game.videos && game.videos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
            Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {game.videos.map((video, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${video.split("v=")[1]}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
