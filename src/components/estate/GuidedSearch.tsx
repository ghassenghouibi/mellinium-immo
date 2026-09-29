import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
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

  if (!hero) {
    return <AnimatedGuidedSearch />;
  }

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

const searchSteps = ["Projet", "Ville", "Pièces", "Budget"];

function AnimatedGuidedSearch() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState(0);
  const [budget, setBudget] = useState(0);
  const budgets = transaction === "vente" ? saleBudgets : rentBudgets;

  const chooseTransaction = (value: "vente" | "location") => {
    setTransaction(value);
    setBudget(0);
    setStep(1);
  };

  const launchSearch = (value: number) => {
    setBudget(value);
    void navigate({
      to: "/biens",
      search: {
        transaction,
        city: city || undefined,
        rooms: rooms || undefined,
        budget: value || undefined,
      },
    });
  };

  return (
    <div className="guided-search" aria-label="Construire votre recherche">
      <div className="guided-search-track" aria-hidden="true">
        <span className="guided-search-line" />
        {searchSteps.map((label, index) => (
          <button
            key={label}
            type="button"
            tabIndex={-1}
            className={`guided-search-stop ${index < step ? "is-complete" : ""} ${index === step ? "is-active" : ""}`}
          >
            <span>{index < step ? <Check /> : index + 1}</span>
            <small>{label}</small>
          </button>
        ))}
        <span className="guided-search-carriage" style={{ left: `${step * 33.333}%` }}><ArrowRight /></span>
      </div>

      <div key={step} className="guided-search-stage">
        {step > 0 && <Button type="button" variant="ghost" size="icon" className="guided-search-back" aria-label="Étape précédente" onClick={() => setStep((current) => current - 1)}><ArrowLeft /></Button>}
        <p className="eyebrow text-primary">Étape {step + 1} sur 4</p>
        {step === 0 && <><h3>Quel est votre projet&nbsp;?</h3><div className="guided-search-options"><Button type="button" variant="outline" onClick={() => chooseTransaction("vente")}>Acheter</Button><Button type="button" variant="outline" onClick={() => chooseTransaction("location")}>Louer</Button></div></>}
        {step === 1 && <><h3>Où souhaitez-vous vivre&nbsp;?</h3><label className="guided-search-select"><span>Ville</span><select aria-label="Ville de la recherche guidée" value={city} onChange={(event) => { setCity(event.target.value); if (event.target.value) setStep(2); }}><option value="">Choisir une ville</option>{cities.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></>}
        {step === 2 && <><h3>De combien de pièces avez-vous besoin&nbsp;?</h3><div className="guided-search-options guided-search-options-many">{[2, 3, 4, 5, 6].map((item) => <Button key={item} type="button" variant="outline" onClick={() => { setRooms(item); setStep(3); }}>{item}+</Button>)}</div></>}
        {step === 3 && <><h3>Quel est votre budget maximum&nbsp;?</h3><label className="guided-search-select"><span>Budget en DNT</span><select aria-label="Budget de la recherche guidée" value={budget} onChange={(event) => launchSearch(Number(event.target.value))}><option value="0">Choisir un budget</option>{budgets.map((item) => <option key={item} value={item}>{new Intl.NumberFormat("fr-TN").format(item)} DNT</option>)}</select></label></>}
      </div>
    </div>
  );
}