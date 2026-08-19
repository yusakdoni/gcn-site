interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean; // use on navy/dark-background sections (e.g. Industries)
}

export function SectionHeader({ eyebrow, title, description, align = "left", dark = false }: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <span className={`eyebrow ${dark ? "!text-electric" : ""}`}>{eyebrow}</span>
      <h2 className={`text-h2 text-3xl md:text-h2 ${dark ? "!text-white" : ""}`}>{title}</h2>
      {description && <p className={`text-body ${dark ? "text-white/70" : "text-navy/70"}`}>{description}</p>}
    </div>
  );
}
