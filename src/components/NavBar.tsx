import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../data/resume-data";

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen, scrollTo }: NavBarProps) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out", display: "block" }
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => { gsap.set(menu, { display: "none" }); },
      });
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-sans text-xl font-light tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors"
        >
          Ariana
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-xs tracking-[0.18em] uppercase font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-background border-t border-border overflow-hidden"
        style={{ display: "none", height: 0 }}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-left text-sm tracking-[0.14em] uppercase font-body text-foreground py-1"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
