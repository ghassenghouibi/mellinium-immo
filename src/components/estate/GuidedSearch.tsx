import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { cities } from "@/lib/properties";

const saleBudgets = [500000, 900000, 1500000, 3000000];
const rentBudgets = [2000, 3500, 6000, 10000];

export function GuidedSearch({ hero = false }: { hero?: boolean }) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState(0);
  const [budget, setBudget] = useState(0);
  const budgets = transaction === "vente" ? saleBudgets : rentBudgets;

  const changeTransaction = (value: "vente" | "location") => {
    setTransaction(value);
    setBudget(0);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({
      to: "/biens",
      search: {
        transaction,
        city: city || undefined,
        rooms: rooms || undefined,
        budget: budget || undefined,
      },
    });
  };

  return (
    <form onSubmit={submit} className={`direct-search ${hero ? "direct-search-hero" : ""}`} aria-label="Rechercher un bien">
      <div className="direct-search-transaction" aria-label="Transaction">
        <Button type="button" variant={transaction === "vente" ? "default" : "ghost"} onClick={() => changeTransaction("vente")}>Vente</Button>
        <Button type="button" variant={transaction === "location" ? "default" : "ghost"} onClick={() => changeTransaction("location")}>Location</Button>
      </div>

      <label className="direct-search-field">
        <span>Localisation</span>
        <select aria-label="Ville" value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="">Toute la Tunisie</option>
          {cities.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <label className="direct-search-field">
        <span>Pièces</span>
        <select aria-label="Nombre de pièces" value={rooms} onChange={(event) => setRooms(Number(event.target.value))}>
          <option value="0">Toutes</option>
          {[2, 3, 4, 5, 6].map((item) => <option key={item} value={item}>{item} pièces et +</option>)}
        </select>
      </label>

      <label className="direct-search-field">
        <span>Budget maximum</span>
        <select aria-label="Budget" value={budget} onChange={(event) => setBudget(Number(event.target.value))}>
          <option value="0">Sans limite</option>
          {budgets.map((item) => <option key={item} value={item}>{new Intl.NumberFormat("fr-TN").format(item)} DNT</option>)}
        </select>
      </label>

      <Button type="submit" size="lg" className="direct-search-submit"><Search /> Rechercher</Button>
    </form>
  );
}