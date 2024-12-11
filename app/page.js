"use client";

import { useState } from "react";

import RecentGames from "./components/RecentGames";
import TopRatedGames from "./components/TopRatedGames";
import UpcomingGames from "./components/UpcomingGames";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("topRated");

  return (
    <div className="space-y-8">
      <section className="text-center px-4 py-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Welcome to GameVerse
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Discover the most anticipated, popular, and highly-rated games
        </p>
      </section>

      <div className="flex justify-center space-x-4 mb-8 px-4">
        <button
          onClick={() => setActiveSection("topRated")}
          className={`px-8 py-4 rounded-full text-xl font-semibold transition-colors ${
            activeSection === "topRated"
              ? "bg-purple-600 text-white dark:bg-purple-800"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Top Rated Games
        </button>
        <button
          onClick={() => setActiveSection("recent")}
          className={`px-8 py-4 rounded-full text-xl font-semibold transition-colors ${
            activeSection === "recent"
              ? "bg-purple-600 text-white dark:bg-purple-800"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Recent Releases
        </button>
        <button
          onClick={() => setActiveSection("upcoming")}
          className={`px-8 py-4 rounded-full text-xl font-semibold transition-colors ${
            activeSection === "upcoming"
              ? "bg-purple-600 text-white dark:bg-purple-800"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Upcoming Games
        </button>
      </div>

      <div className="w-full max-w-none px-4">
        {activeSection === "topRated" && <TopRatedGames />}
        {activeSection === "recent" && <RecentGames />}
        {activeSection === "upcoming" && <UpcomingGames />}
      </div>
    </div>
  );
}
