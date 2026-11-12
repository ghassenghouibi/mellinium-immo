import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n, type L } from "@/lib/i18n";
import { districts, formatAmount, formatCompactAmount, rentBudgets, saleBudgets } from "@/lib/properties";
import { SegmentedControl, SelectField } from "./fields";

const allAreas: L = { fr: "Tous les quartiers", en: "All areas" };

export function GuidedSearch({ hero = false }: { hero?: boolean }) {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [transaction, setTransaction] = useState<"vente" | "location">("location");
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
    <form onSubmit={submit} className="direct-search" aria-label={t({ fr: "Rechercher un bien", en: "Search a property" })}>
      <div className="direct-search-transaction">
        <SegmentedControl
          className="direct-search-toggle"
          label="Transaction"
          value={transaction}
          onChange={changeTransaction}
          options={[{ value: "location", label: t({ fr: "Location", en: "Rent" }) }, { value: "vente", label: t({ fr: "Achat", en: "Buy" }) }]}
        />
        <p className="direct-search-hint"><Search />{t({ fr: "Recherche rapide", en: "Quick search" })}</p>
      </div>

      <SelectField
        variant="inline"
        className="direct-search-field"
        label={t({ fr: "Quartier", en: "Area" })}
        value={district}
        onValueChange={setDistrict}
        options={[{ value: "", label: t(allAreas) }, ...districts.map((item) => ({ value: item, label: item }))]}
      />

      <SelectField
        variant="inline"
        className="direct-search-field"
        label={t({ fr: "Pièces", en: "Rooms" })}
        value={String(rooms)}
        onValueChange={(value) => setRooms(Number(value))}
        options={[{ value: "0", label: t({ fr: "Toutes", en: "Any" }) }, ...[2, 3, 4, 5, 6].map((item) => ({ value: String(item), label: `${item}+` }))]}
      />

      <SelectField
        variant="inline"
        className="direct-search-field"
        label={t({ fr: "Budget max.", en: "Max. budget" })}
        value={String(budget)}
        onValueChange={(value) => setBudget(Number(value))}
        options={[{ value: "0", label: t({ fr: "Sans limite", en: "No limit" }) }, ...budgets.map((item) => ({ value: String(item), label: formatCompactAmount(item, lang) }))]}
      />

      <button type="submit" className="direct-search-submit"><Search /><span>{t({ fr: "Rechercher", en: "Search" })}</span></button>
    </form>
  );
}

const searchSteps: L[] = [
  { fr: "Projet", en: "Project" },
  { fr: "Quartier", en: "Area" },
  { fr: "Pièces", en: "Rooms" },
  { fr: "Budget", en: "Budget" },
];

function AnimatedGuidedSearch() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<"vente" | "location">("location");
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
    <div className="guided-search" aria-label={t({ fr: "Construire votre recherche", en: "Build your search" })}>
      <div className="guided-search-track" aria-hidden="true">
        <span className="guided-search-line" />
        {searchSteps.map((label, index) => (
          <button
            key={label.en}
            type="button"
            tabIndex={-1}
            className={`guided-search-stop ${index < step ? "is-complete" : ""} ${index === step ? "is-active" : ""}`}
          >
            <span>{index < step ? <Check /> : index + 1}</span>
            <small>{t(label)}</small>
          </button>
        ))}
        <span className="guided-search-carriage" style={{ left: `${step * 33.333}%` }}><ArrowRight /></span>
      </div>

      <div key={step} className="guided-search-stage">
        {step > 0 && <Button type="button" variant="ghost" size="icon" className="guided-search-back" aria-label={t({ fr: "Étape précédente", en: "Previous step" })} onClick={() => setStep((current) => current - 1)}><ArrowLeft /></Button>}
        <p className="eyebrow text-primary">{t({ fr: `Étape ${step + 1} sur 4`, en: `Step ${step + 1} of 4` })}</p>
        {step === 0 && <><h3>{t({ fr: "Quel est votre projet ?", en: "What is your project?" })}</h3><div className="guided-search-options"><Button type="button" variant="outline" onClick={() => chooseTransaction("location")}>{t({ fr: "Louer", en: "Rent" })}</Button><Button type="button" variant="outline" onClick={() => chooseTransaction("vente")}>{t({ fr: "Acheter", en: "Buy" })}</Button></div></>}
        {step === 1 && <><h3>{t({ fr: "Dans quel quartier ?", en: "Which area?" })}</h3><div className="guided-search-options">{districts.map((item) => <Button key={item} type="button" variant="outline" onClick={() => { setDistrict(item); setStep(2); }}>{item}</Button>)}<Button type="button" variant="outline" onClick={() => { setDistrict(""); setStep(2); }}>{t(allAreas)}</Button></div></>}
        {step === 2 && <><h3>{t({ fr: "De combien de pièces avez-vous besoin ?", en: "How many rooms do you need?" })}</h3><div className="guided-search-options guided-search-options-many">{[2, 3, 4, 5, 6].map((item) => <Button key={item} type="button" variant="outline" onClick={() => { setRooms(item); setStep(3); }}>{item}+</Button>)}</div></>}
        {step === 3 && <><h3>{t({ fr: "Quel est votre budget maximum ?", en: "What is your maximum budget?" })}</h3><SelectField variant="large" className="guided-search-budget" label={t({ fr: "Budget en TND", en: "Budget in TND" })} value={budget ? String(budget) : ""} placeholder={t({ fr: "Choisir un budget", en: "Choose a budget" })} onValueChange={(value) => launchSearch(Number(value))} options={budgets.map((item) => ({ value: String(item), label: formatAmount(item, lang) }))} /><Button type="button" variant="link" className="mt-4" onClick={() => launchSearch(0)}>{t({ fr: "Voir tous les biens, sans limite de budget", en: "See all properties, with no budget limit" })}</Button></>}
      </div>
    </div>
  );
}
