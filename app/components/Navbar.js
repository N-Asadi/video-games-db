import Link from "next/link";
import { Home, GamepadIcon, InfoIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold flex items-center">
          <GamepadIcon className="w-8 h-8 mr-2" />
          GameVerse
        </Link>
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              className="flex items-center text-xl hover:text-purple-200 transition-colors"
            >
              <Home className="w-6 h-6 mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/games"
              className="flex items-center text-xl hover:text-purple-200 transition-colors"
            >
              <GamepadIcon className="w-6 h-6 mr-2" />
              Games
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center text-xl hover:text-purple-200 transition-colors"
            >
              <InfoIcon className="w-6 h-6 mr-2" />
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
