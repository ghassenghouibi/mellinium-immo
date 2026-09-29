import { useNavigate } from "@tanstack/react-router";
import { Building2, Check, KeyRound, MapPin, Minus, Plus, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cities } from "@/lib/properties";

const saleBudgets = [
  { label: "500 000 DNT", value: 500000 },
  { label: "900 000 DNT", value: 900000 },
  { label: "1 500 000 DNT", value: 1500000 },
  { label: "3 000 000 DNT", value: 3000000 },
];
const rentBudgets = [
  { label: "2 000 DNT", value: 2000 },
  { label: "3 500 DNT", value: 3500 },
  { label: "6 000 DNT", value: 6000 },
  { label: "10 000 DNT", value: 10000 },
];

export function GuidedSearch() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [rooms, setRooms] = useState(3);
  const budgets = transaction === "vente" ? saleBudgets : rentBudgets;

  const selectAndNext = (action: () => void) => {
    action();
    window.setTimeout(() => setStep((current) => Math.min(current + 1, 3)), 220);
  };

  const launchSearch = (budget: number) => {
    void navigate({ to: "/biens", search: { transaction, city, rooms, budget } });
  };

  const choices = [
    { icon: KeyRound, label: transaction === "vente" ? "Acheter" : "Louer", complete: step > 0 },
    { icon: MapPin, label: city || "Lieu", complete: step > 1 },
    { icon: Building2, label: `${rooms} pièces`, complete: step > 2 },
    { icon: WalletCards, label: "Budget", complete: false },
  ];

  return (
    <div className="search-journey" data-reveal>
      <div className="journey-summary" aria-label="Critères de recherche">
        {choices.map(({ icon: Icon, label, complete }, index) => (
          <button key={index} type="button" onClick={() => index <= step && setStep(index)} className={`journey-chip ${index === step ? "is-current" : ""} ${complete ? "is-complete" : ""}`} disabled={index > step}>
            <span className="journey-chip-icon">{complete ? <Check /> : <Icon />}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="journey-stage">
        {step === 0 && <div className="journey-panel"><p className="eyebrow text-primary">Votre projet</p><h3>Vous souhaitez acheter ou louer ?</h3><div className="journey-options"><Button variant="outline" onClick={() => selectAndNext(() => setTransaction("vente"))}>Acheter</Button><Button variant="outline" onClick={() => selectAndNext(() => setTransaction("location"))}>Louer</Button></div></div>}
        {step === 1 && <div className="journey-panel"><p className="eyebrow text-primary">En Tunisie</p><h3>Où souhaitez-vous vous installer ?</h3><div className="journey-options journey-options-wrap">{cities.map((item) => <Button key={item} variant="outline" onClick={() => selectAndNext(() => setCity(item))}>{item}</Button>)}</div></div>}
        {step === 2 && <div className="journey-panel"><p className="eyebrow text-primary">Votre espace</p><h3>Combien de pièces au minimum ?</h3><div className="room-stepper"><Button variant="outline" size="icon" aria-label="Retirer une pièce" onClick={() => setRooms((value) => Math.max(1, value - 1))}><Minus /></Button><strong>{rooms}</strong><Button variant="outline" size="icon" aria-label="Ajouter une pièce" onClick={() => setRooms((value) => value + 1)}><Plus /></Button></div><Button onClick={() => setStep(3)}>Choisir mon budget</Button></div>}
        {step === 3 && <div className="journey-panel"><p className="eyebrow text-primary">Dernier choix</p><h3>Quel est votre budget maximum ?</h3><p className="journey-hint">Touchez un montant pour afficher directement les biens.</p><div className="journey-options journey-options-wrap">{budgets.map((item) => <Button key={item.value} variant="outline" onClick={() => launchSearch(item.value)}>{item.label}</Button>)}</div></div>}
      </div>
    </div>
  );
}