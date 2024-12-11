import Image from "next/image";
import { Gamepad, Star, Calendar, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600 dark:text-purple-400">
        About GameVerse
      </h1>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-90 h-90 flex items-center justify-center">
            <img
              src="https://i.postimg.cc/ZnsfhhWT/Screenshot-2024-12-10-230156-processed.png"
              alt="GameVerse Logo"
              className="h-1000 w-1000"
            />
          </div>
        </div>
        <p className="text-2xl mb-6 text-gray-700 dark:text-gray-300">
          GameVerse is your ultimate destination for exploring the vast world of
          video games. Our platform provides comprehensive information about the
          latest releases, upcoming titles, and all-time classics across various
          gaming platforms.
        </p>
        <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
          Our mission is to create a hub where gamers can discover new titles,
          research their favorite games, and stay up-to-date with the
          ever-evolving gaming industry. Whether you're a casual player or a
          hardcore enthusiast, GameVerse has something for everyone.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
          Key Features:
        </h2>
        <ul className="list-none mb-6 space-y-4">
          <li className="flex items-center">
            <Gamepad className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300 text-lg">
              Extensive database of video games
            </span>
          </li>
          <li className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">
              Up-to-date information on recent releases and upcoming titles
            </span>
          </li>
          <li className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">
              Detailed game pages with summaries, ratings, and screenshots
            </span>
          </li>
          <li className="flex items-center">
            <Users className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-700 dark:text-gray-300">
              User-friendly search and filter options
            </span>
          </li>
        </ul>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          GameVerse is powered by the IGDB API, ensuring that our database is
          always current and comprehensive. We're committed to providing the
          best possible experience for gamers worldwide, and we're constantly
          working on improving and expanding our platform.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Thank you for choosing GameVerse as your go-to source for video game
          information. Game on!
        </p>
      </div>
    </div>
  );
}
