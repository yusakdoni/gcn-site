import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

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
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input className={fieldBase} required={required} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  required,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; required?: boolean; options: string[] }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select className={`${fieldBase} appearance-none bg-white`} required={required} {...props}>
        <option value="">Select {label.toLowerCase()}</option>
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
  return (
    <label className="flex items-start gap-3 text-[13px] text-navy/70">
      <input type="checkbox" name={name} required className="mt-1" />
      <span>
        I agree that GCN may contact me about this request, in accordance with the{" "}
        <a href="/privacy-policy" className="text-electric underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        . <span className="text-electric">*</span>
      </span>
    </label>
  );
}

// Honeypot field: hidden from real visitors via CSS, but bots that fill in
// every field will populate it. The PHP handlers (public/contact.php,
// public/rfq.php) reject any submission where this field is non-empty.
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
  required,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; required?: boolean }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <textarea className={`${fieldBase} min-h-[120px] resize-y`} required={required} {...props} />
    </div>
  );
}
