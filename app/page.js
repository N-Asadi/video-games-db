import RecentGames from "./components/RecentGames";
import PopularGames from "./components/PopularGames";

export default function HomePage() {
  return (
    <div className="space-y-12 px-6 py-8">
      <section>
        <h1 className="text-4xl font-bold mb-8">Welcome to Video Games DB</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore the latest releases and most popular games of all time!
        </p>
      </section>

      <RecentGames />
      <PopularGames />
    </div>
  );
}
