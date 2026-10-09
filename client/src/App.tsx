import { Routes, Route } from "react-router";

//import Navbar from "./components/Navbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import LibraryPage from "./pages/LibraryPage.tsx";
import AddBookPage from "./pages/AddBookPage.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";
import StatsPage from "./pages/StatsPage.tsx";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/*<Navbar />*/}
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bibliotheque" element={<LibraryPage />} />
          <Route path="/ajouter" element={<AddBookPage />} />
          <Route path="/livre/:id" element={<BookDetailPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  );
}
