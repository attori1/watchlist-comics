import { useState } from "react";

import "./App.css";


type Statut = "à lire" | "en cours" | "lu";

type Comic = {
  id: number;
  titre: string;
  serie: string;
  statut: Statut;
};

// données de test qui seront remplies par le back plus tard

const comicsDeDepart: Comic[] = [
  {id: 1, titre: "Saga #1", serie: "Saga", statut: "lu" },
  {id: 2, titre: "Watchmen #1", serie: "Watchmen", statut: "en cours" },
  {id: 3, titre: "Sandman #1", serie: "The Sandman", statut: "à lire"},
];

function App() {

  const [comics, setComics] = useState<Comic[]>(comicsDeDepart);

  const [nouveauTitre, setNouveauTitre] = useState<string>("");

  function ajouterComic(){

    if(nouveauTitre.trim()=== "") return;

    const nouveau: Comic = {
      id: Date.now(),
      titre: nouveauTitre,
      serie: "Série inconnue", 
      statut: "à lire",
    };

    setComics([...comics, nouveau]);

    setNouveauTitre("");
  }

  function supprimerComic(id: number){
    setComics(comics.filter((c)=> c.id !== id));
  }
    function changerStatut(id: number, statut: Statut){
      setComics(
        comics.map((c) => (c.id === id ? { ...c , statut: statut} : c))
      );
    }

    return (
      <div className="app">
        <h1>Ma Watchlist Comics</h1>

        <div className="barre-ajout">
          <input
            placeholder="Titre du comic à ajouter"
            value={nouveauTitre}
            onChange={(e) => setNouveauTitre(e.target.value)}/>
            <button onClick={ajouterComic}>Ajouter</button>
        </div>

        {comics.map((c)=>(
          <div key={c.id} className="comic">
            <div className="comics-infos">
            <strong>{c.titre}</strong>
            <div className="comic-serie">{c.serie}</div>
          </div>

          <select value={c.statut} onChange={(e) => changerStatut(c.id, e.target.value as Statut)}>
            <option value="à lire">À lire</option>
            <option value="en cours">En cours</option>
            <option value="lu">Lu</option>
          </select>

          <button onClick={() => supprimerComic(c.id)}>🗑️</button>
          </div>
        ))}

        {comics.length === 0 && (
          <p className="message-vide">Aucun comic. Ajoute-en un !</p>
        )}
        </div>
    );
  };


export default App;