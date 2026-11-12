import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Composants de formulaire du système de design Mellinium.
 * Toutes les listes, champs et sélecteurs du site passent par ici pour garder une seule apparence.
 */

export type FieldVariant = "boxed" | "underline" | "inline" | "large";

export type SelectOption = { value: string; label: string };

/** Radix interdit la valeur vide : on la remplace par une sentinelle le temps de l’affichage. */
const EMPTY = "__empty__";
const toRadix = (value: string) => (value === "" ? EMPTY : value);
const fromRadix = (value: string) => (value === EMPTY ? "" : value);

type SelectFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  variant?: FieldVariant;
  hideLabel?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
};

export function SelectField({ label, value, onValueChange, options, variant = "boxed", hideLabel = false, placeholder, className, name }: SelectFieldProps) {
  const id = useId();
  // Sans option vide, une valeur vide affiche le texte d’attente.
  const showsPlaceholder = value === "" && !options.some((option) => option.value === "");
  return (
    <div className={cn("ds-field", `ds-field-${variant}`, className)}>
      <span id={`${id}-label`} className={cn("ds-label", hideLabel && "sr-only")}>{label}</span>
      <SelectPrimitive.Root value={showsPlaceholder ? "" : toRadix(value)} onValueChange={(next) => onValueChange(fromRadix(next))} name={name}>
        <SelectPrimitive.Trigger aria-labelledby={`${id}-label`} className="ds-control ds-select-trigger">
          <span className="ds-select-value"><SelectPrimitive.Value placeholder={placeholder} /></span>
          <SelectPrimitive.Icon className="ds-select-icon"><ChevronDown /></SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content position="popper" sideOffset={6} className="ds-select-content">
            <SelectPrimitive.Viewport className="ds-select-viewport">
              {options.map((option) => (
                <SelectPrimitive.Item key={option.value} value={toRadix(option.value)} className="ds-select-item">
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ds-select-check"><Check /></SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; variant?: FieldVariant; className?: string };

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ label, variant = "underline", className, ...props }, ref) {
  return (
    <label className={cn("ds-field", `ds-field-${variant}`, className)}>
      <span className="ds-label">{label}</span>
      <input ref={ref} className="ds-control ds-input" {...props} />
    </label>
  );
});

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; variant?: FieldVariant; className?: string };

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField({ label, variant = "underline", className, ...props }, ref) {
  return (
    <label className={cn("ds-field", `ds-field-${variant}`, className)}>
      <span className="ds-label">{label}</span>
      <textarea ref={ref} className="ds-control ds-textarea" {...props} />
    </label>
  );
});

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: ReactNode }[];
  tone?: "default" | "glass";
  className?: string;
};

/** Bascule entre quelques choix exclusifs (Louer / Acheter…), avec un indicateur qui glisse. */
export function SegmentedControl<T extends string>({ label, value, onChange, options, tone = "default", className }: SegmentedControlProps<T>) {
  const index = Math.max(0, options.findIndex((option) => option.value === value));
  return (
    <div role="radiogroup" aria-label={label} className={cn("ds-segmented", tone === "glass" && "ds-segmented-glass", className)} style={{ ["--ds-count" as string]: options.length, ["--ds-index" as string]: index }}>
      <span className="ds-segmented-thumb" aria-hidden="true" />
      {options.map((option) => (
        <button key={option.value} type="button" role="radio" aria-checked={option.value === value} onClick={() => onChange(option.value)} className={cn("ds-segmented-option", option.value === value && "is-active")}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
