// Les types sont définis une seule fois, côté serveur, et réutilisés ici :
// si la forme d'un livre change, le client et le serveur restent d'accord
export type { Statut, InfosLivre, Book, Stats } from "../../server/types.ts";
