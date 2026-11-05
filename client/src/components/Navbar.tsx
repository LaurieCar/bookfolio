import { NavLink } from "react-router";
import icone from "../assets/BookFolio-icone.svg";

export default function Navbar() {
  // Maquette : le lien de la page actuelle a une pastille vert clair
  const lienClasses = ({ isActive }: { isActive: boolean }) =>
    "px-4 py-2 rounded-control font-medium " +
    (isActive ? "bg-lu text-lu-text" : "text-ink");

  return (
    <header className="bg-white border-b border-line">
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        {/* À gauche : l'icône et le nom de l'appli */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-heading text-xl font-bold"
        >
          {/* alt vide : le nom « BookFolio » est écrit juste à côté */}
          <img src={icone} alt="" className="h-9 w-auto" />
          BookFolio
        </NavLink>

        {/* À droite : les liens */}
        <div className="flex gap-2">
          <NavLink to="/" end className={lienClasses}>
            Accueil
          </NavLink>
          <NavLink to="/bibliotheque" className={lienClasses}>
            Ma bibliothèque
          </NavLink>
          <NavLink to="/ajouter" className={lienClasses}>
            Ajouter un livre
          </NavLink>
          <NavLink to="/stats" className={lienClasses}>
            Statistiques
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
