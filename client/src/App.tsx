import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import LibraryPage from "./pages/LibraryPage.tsx";
import AddBookPage from "./pages/AddBookPage.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";
import DesignPage from "./pages/DesignPage.tsx";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bibliotheque" element={<LibraryPage />} />
          <Route path="/ajouter" element={<AddBookPage />} />
          <Route path="/livre/:id" element={<BookDetailPage />} />
          <Route path="/stats" element={<StatsPage />} />
          {import.meta.env.DEV && (
            <Route path="/design" element={<DesignPage />} />
          )}
        </Routes>
      </main>
    </div>
  );
}
