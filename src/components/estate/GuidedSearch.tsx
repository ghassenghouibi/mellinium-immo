import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { districts, formatAmount, rentBudgets, saleBudgets } from "@/lib/properties";

export function GuidedSearch({ hero = false }: { hero?: boolean }) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [district, setDistrict] = useState("");
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
        district: district || undefined,
        rooms: rooms || undefined,
        budget: budget || undefined,
      },
    });
  };

  return (
    <form onSubmit={submit} className="direct-search" aria-label="Rechercher un bien">
      <div className="direct-search-transaction" aria-label="Transaction">
        <Button type="button" variant={transaction === "vente" ? "default" : "ghost"} onClick={() => changeTransaction("vente")}>Vente</Button>
        <Button type="button" variant={transaction === "location" ? "default" : "ghost"} onClick={() => changeTransaction("location")}>Location</Button>
      </div>

      <label className="direct-search-field">
        <span>Quartier</span>
        <select aria-label="Quartier" value={district} onChange={(event) => setDistrict(event.target.value)}>
          <option value="">Toute La Marsa</option>
          {districts.map((item) => <option key={item} value={item}>{item}</option>)}
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
          {budgets.map((item) => <option key={item} value={item}>{formatAmount(item)}</option>)}
        </select>
      </label>

      <Button type="submit" size="lg" className="direct-search-submit"><Search /> Rechercher</Button>
    </form>
  );
}

const searchSteps = ["Projet", "Quartier", "Pièces", "Budget"];

function AnimatedGuidedSearch() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [district, setDistrict] = useState("");
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
        district: district || undefined,
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
        {step === 1 && <><h3>Dans quel quartier de La Marsa&nbsp;?</h3><div className="guided-search-options">{districts.map((item) => <Button key={item} type="button" variant="outline" onClick={() => { setDistrict(item); setStep(2); }}>{item}</Button>)}<Button type="button" variant="outline" onClick={() => { setDistrict(""); setStep(2); }}>Toute La Marsa</Button></div></>}
        {step === 2 && <><h3>De combien de pièces avez-vous besoin&nbsp;?</h3><div className="guided-search-options guided-search-options-many">{[2, 3, 4, 5, 6].map((item) => <Button key={item} type="button" variant="outline" onClick={() => { setRooms(item); setStep(3); }}>{item}+</Button>)}</div></>}
        {step === 3 && <><h3>Quel est votre budget maximum&nbsp;?</h3><label className="guided-search-select"><span>Budget en TND</span><select aria-label="Budget de la recherche guidée" value={budget} onChange={(event) => launchSearch(Number(event.target.value))}><option value="0">Choisir un budget</option>{budgets.map((item) => <option key={item} value={item}>{formatAmount(item)}</option>)}</select></label><Button type="button" variant="link" className="mt-4" onClick={() => launchSearch(0)}>Voir tous les biens, sans limite de budget</Button></>}
      </div>
    </div>
  );
}