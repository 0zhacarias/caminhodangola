import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Logo from "../../assets/logotipo-caminhosdangola.svg";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";

interface MenuItem {
  label: string;
  path: string;
  subItems: { label: string; path: string }[];
}

export function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu: MenuItem[] = [
    { label: "Home", path: "/", subItems: [] },
    { label: "Reviews", path: "/avaliacoes", subItems: [] },
    { label: "Private Tours", path: "/private-tours", subItems: [] },
    { label: "Group Tours", path: "/group-tours", subItems: [] },
    { label: "About Us", path: "/sobre", subItems: [] },
    { label: "Gallery", path: "/galeria", subItems: [] },
  ];

  // Close mobile menu with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="flex flex-1 justify-between items-center px-8 md:px-32 py-6 border-b-2 border-slate-600 bg-slate-50 relative">
      {/* Logo */}
      <div className="flex items-center shrink-0 min-w-[8rem]">
        <Link href="/">
          <img
            src={Logo}
            alt="Logotipo Caminhos de Angola"
            className="w-32 object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:flex gap-8 items-center relative">
        {menu.map((item, idx) => (
          <div
            key={item.label}
            className="relative p-1 py-2"
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <Link
              href={item.path}
              className="text-slate-950 w-32 hover:text-yellow-500 whitespace-nowrap"
            >
              {item.label}
            </Link>

            {openIndex === idx && item.subItems.length > 0 && (
              <div className="absolute top-full left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg z-50">
                <ul className="flex flex-col p-2 text-sm">
                  {item.subItems.map((sub) => (
                    <li key={sub.path}>
                      <Link
                        href={sub.path}
                        className="block px-4 py-2 hover:bg-slate-700 rounded text-slate-200"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Buttons / Controls on the right */}
      <div className="flex items-center gap-4">
        {/* Reserve - desktop only */}
        <a
          href={`https://wa.me/+244923469271?text=${encodeURIComponent(
            "Hello! I would like more information about your tours."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:inline-block p-2 px-6 rounded-full bg-yellow-500"
        >
          Reserve
        </a>

        {/* Login - desktop only */}
        <Link
          href="/login"
          className="hidden xl:inline-block p-2 px-6 rounded-full border border-slate-300 text-slate-950 hover:bg-slate-200"
        >
          Login
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="xl:hidden p-2 rounded-md text-slate-950 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <Menu01Icon size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950 bg-opacity-95 z-40 flex flex-col px-8 py-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center mb-6">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <img src={Logo} alt="Logo" className="w-28 invert brightness-0" />
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-slate-100 p-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <Cancel01Icon size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="text-slate-100 text-lg font-semibold hover:text-yellow-500"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Reserve dentro do menu mobile */}
            <a
              href={`https://wa.me/+244923469271?text=${encodeURIComponent(
                "Hello! I would like more information about your tours."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block p-2 px-6 rounded-full bg-yellow-500 text-slate-950 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Reserve
            </a>

            {/* Login dentro do menu mobile */}
            <Link
              href="/login"
              className="inline-block p-2 px-6 rounded-full border border-slate-500 text-slate-100 hover:bg-slate-800 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
