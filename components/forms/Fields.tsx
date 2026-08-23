"use client";
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const fieldBase =
  "w-full border border-mist bg-white px-4 py-3 text-[15px] text-navy placeholder:text-navy/30 focus:border-navy focus:outline-none transition-colors";

function Label({ children, required }: { children: string; required?: boolean }) {
  return (
    <label className="text-[13px] font-medium text-navy/70 mb-2 block">
      {children}
      {required && <span className="text-electric ml-0.5">*</span>}
    </label>
  );
}

export function TextField({
  label,
  labelId,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; labelId?: string; required?: boolean }) {
  const { lang } = useLanguage();
  return (
    <div>
      <Label required={required}>{lang === "id" ? labelId || label : label}</Label>
      <input className={fieldBase} required={required} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  labelId,
  required,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; labelId?: string; required?: boolean; options: string[] }) {
  const { lang } = useLanguage();
  const displayLabel = lang === "id" ? labelId || label : label;
  return (
    <div>
      <Label required={required}>{displayLabel}</Label>
      <select className={`${fieldBase} appearance-none bg-white`} required={required} {...props}>
        <option value="">{lang === "id" ? `Pilih ${displayLabel.toLowerCase()}` : `Select ${displayLabel.toLowerCase()}`}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ConsentCheckbox({ name }: { name: string }) {
  const { lang } = useLanguage();
  return (
    <label className="flex items-start gap-3 text-[13px] text-navy/70">
      <input type="checkbox" name={name} required className="mt-1" />
      {lang === "id" ? (
        <span>
          Saya setuju GCN dapat menghubungi saya terkait permintaan ini, sesuai dengan{" "}
          <a href="/privacy-policy" className="text-electric underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Kebijakan Privasi
          </a>
          . <span className="text-electric">*</span>
        </span>
      ) : (
        <span>
          I agree that GCN may contact me about this request, in accordance with the{" "}
          <a href="/privacy-policy" className="text-electric underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          . <span className="text-electric">*</span>
        </span>
      )}
    </label>
  );
}

// Honeypot field: hidden from real visitors via CSS, but bots that fill in
// every field will populate it. The API routes (app/api/contact,
// app/api/rfq) reject any submission where this field is non-empty.
// Do not remove the "hp_" name — it doubles as the server-side check key.
export function HoneypotField() {
  return (
    <input
      type="text"
      name="hp_website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] w-px h-px opacity-0"
    />
  );
}

export function TextareaField({
  label,
  labelId,
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; labelId?: string; required?: boolean }) {
  const { lang } = useLanguage();
  return (
    <div>
      <Label required={required}>{lang === "id" ? labelId || label : label}</Label>
      <textarea className={`${fieldBase} min-h-[120px] resize-y`} required={required} {...props} />
    </div>
  );
}
