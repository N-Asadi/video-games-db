export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-16">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} GameVerse. All Rights Reserved.
        </p>
        <p className="text-sm text-gray-400">
          Powered by IGDB API. GameVerse is not affiliated with or endorsed by
          IGDB.
        </p>
      </div>
    </footer>
  );
}
