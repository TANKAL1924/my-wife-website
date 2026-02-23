export default function FooterSection() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-lg font-light tracking-[0.2em] uppercase text-foreground">
          Ariana
        </p>
        <p className="text-xs font-body text-muted-foreground tracking-wide">
          &copy; {new Date().getFullYear()} — Sport Management Professional
        </p>
      </div>
    </footer>
  );
}
