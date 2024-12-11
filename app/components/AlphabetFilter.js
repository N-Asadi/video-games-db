export default function AlphabetFilter({ onFilterChange, activeLetter }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap justify-center mb-8">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onFilterChange(letter === "#" ? "0123456789" : letter)}
          className={`mx-1 my-1 px-3 py-1 rounded ${
            activeLetter === (letter === "#" ? "0123456789" : letter)
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
