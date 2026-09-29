import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Check, KeyRound, MapPin, Minus, Plus, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cities } from "@/lib/properties";

const saleBudgets = ["750 000 €", "1 500 000 €", "3 000 000 €", "5 000 000 €+"];
const rentBudgets = ["2 500 €", "5 000 €", "10 000 €", "15 000 €+"];

export function GuidedSearch() {
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState(3);
  const [budget, setBudget] = useState("");
  const budgets = transaction === "vente" ? saleBudgets : rentBudgets;

  const selectAndNext = (action: () => void) => {
    action();
    window.setTimeout(() => setStep((current) => Math.min(current + 1, 4)), 180);
  };

  const steps = [
    { icon: KeyRound, label: "Projet" },
    { icon: MapPin, label: "Lieu" },
    { icon: Building2, label: "Pièces" },
    { icon: WalletCards, label: "Budget" },
    { icon: Check, label: "Départ" },
  ];

  return (
    <div className="search-journey" data-reveal>
      <div className="journey-rail" aria-hidden="true"><span style={{ width: `${(step / 4) * 100}%` }} /></div>
      <div className="relative z-10 flex justify-between">
        {steps.map(({ icon: Icon, label }, index) => (
          <button key={label} type="button" onClick={() => index <= step && setStep(index)} className={`journey-stop ${index <= step ? "is-active" : ""}`} aria-label={`Étape ${label}`}>
            <span><Icon /></span><small>{label}</small>
          </button>
        ))}
      </div>

      <div className="journey-stage">
        {step === 0 && <div className="journey-panel"><p className="eyebrow text-primary">Première étape</p><h3>Vous souhaitez acheter ou louer ?</h3><div className="journey-options"><Button variant="outline" onClick={() => selectAndNext(() => setTransaction("vente"))}>Acheter</Button><Button variant="outline" onClick={() => selectAndNext(() => setTransaction("location"))}>Louer</Button></div></div>}
        {step === 1 && <div className="journey-panel"><p className="eyebrow text-primary">Votre destination</p><h3>Où imaginez-vous la suite ?</h3><div className="journey-options journey-options-wrap">{cities.map((item) => <Button key={item} variant="outline" onClick={() => selectAndNext(() => setCity(item))}>{item}</Button>)}</div></div>}
        {step === 2 && <div className="journey-panel"><p className="eyebrow text-primary">Votre espace</p><h3>Combien de pièces au minimum ?</h3><div className="room-stepper"><Button variant="outline" size="icon" aria-label="Retirer une pièce" onClick={() => setRooms((value) => Math.max(1, value - 1))}><Minus /></Button><strong>{rooms}</strong><Button variant="outline" size="icon" aria-label="Ajouter une pièce" onClick={() => setRooms((value) => value + 1)}><Plus /></Button></div><Button onClick={() => setStep(3)}>Continuer <ArrowRight /></Button></div>}
        {step === 3 && <div className="journey-panel"><p className="eyebrow text-primary">Votre enveloppe</p><h3>Quel est votre budget maximum ?</h3><div className="journey-options journey-options-wrap">{budgets.map((item) => <Button key={item} variant="outline" onClick={() => selectAndNext(() => setBudget(item))}>{item}</Button>)}</div></div>}
        {step === 4 && <div className="journey-panel"><p className="eyebrow text-primary">Votre recherche est prête</p><h3>{transaction === "vente" ? "Acheter" : "Louer"} {city ? `à ${city}` : "sur la Côte d’Azur"}</h3><p className="mt-3 text-sm text-muted-foreground">{rooms} pièces minimum{budget ? ` · Jusqu’à ${budget}` : ""}</p><Button asChild className="mt-7"><Link to="/biens" search={{ transaction, city, rooms }}>Voir les biens <ArrowRight /></Link></Button></div>}
      </div>
    </div>
  );
}