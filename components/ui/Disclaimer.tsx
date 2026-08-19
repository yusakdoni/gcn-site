export function Disclaimer({ children }: { children: string }) {
  return (
    <p className="text-caption text-navy/50 border-l-2 border-electric/50 pl-4 leading-relaxed">
      {children}
    </p>
  );
}
