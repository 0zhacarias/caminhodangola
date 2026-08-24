//import { Link } from "@inertiajs/react";
import logoIdeal from "../../assets/logotipo-caminhosdangola.svg";
import {
  //FacebookIcon,
  //TwitterIcon,
  //YoutubeIcon,
  InstagramIcon,
} from "lucide-react";

interface FooterProps {
  configuracoes?: Record<string, string>;
}

export function Footer({ configuracoes = {} }: FooterProps) {
  /*const navItems = [
    "Tours",
    "Individual Tours",
    "Day Trips",
    "Services",
    "Cross Border",
    "Event",
    "Reserve",
    "More",
  ];
*/
  return (
    <footer className="bg-slate-950 text-slate-100 px-6 md:px-32 py-12 mt-16">
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-slate-700 pb-10 flex-wrap">
        {/* Logo & Slogan */}
        <div className="flex flex-col gap-4 max-w-sm">
          <img
            src={logoIdeal}
            alt="Logo Caminhos de Angola"
            className="w-40 invert brightness-0"
          />
          <p className="text-sm text-slate-400">
            Angola Tourism – Travel different
          </p>
        </div>

        {/* Navigation */}
        {/*<div className="flex flex-col gap-3 text-sm">
          <h3 className="text-slate-200 font-semibold uppercase tracking-wide mb-2">
            Navigation
          </h3>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#`}
                //to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-yellow-400"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>*/}

        {/* Reserve Info */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-slate-200 font-semibold uppercase tracking-wide mb-2">
            Get In Touch
          </h3>
          {configuracoes['email_contato'] ? (
            <p>{configuracoes['email_contato']}</p>
          ) : (
            <p>geral@caminhosdangola.com</p>
          )}
          {configuracoes['telefone_principal'] ? (
            <p>{configuracoes['telefone_principal']}</p>
          ) : (
            <p>(+244) 923 469 271</p>
          )}
          {configuracoes['telefone_secundario'] ? (
            <p>{configuracoes['telefone_secundario']}</p>
          ) : (
            <p>(+244) 942 381 493</p>
          )}
          <p>Whatsapp | LINE</p>
          {configuracoes['horario_funcionamento'] ? (
            <p>{configuracoes['horario_funcionamento']}</p>
          ) : (
            <p>08:00 AM – 17:00 PM</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-slate-200 font-semibold uppercase tracking-wide mb-2">
            Address
          </h3>
          {configuracoes['endereco'] ? (
            <p dangerouslySetInnerHTML={{ __html: configuracoes['endereco'].replace('\n', '<br />') }} />
          ) : (
            <p>Comandante Jica Street, near the Moçâmedes Hotel <br /><span className="font-bold">Namibe - Angola</span></p>
          )}
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="text-slate-200 font-semibold uppercase tracking-wide mb-2">
            Follow Us
          </h3>
          <div className="flex gap-4 text-yellow-400">
            {/*
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FacebookIcon size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <YoutubeIcon size={20} />
            </a>*/}
            <a href="https://instagram.com/caminhosdangola" aria-label="Instagram" className="hover:text-white">
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()}</p>
        {/*<div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">
            About
          </a>
          <a href="#" className="hover:text-slate-300">
            Terms
          </a>
          <a href="#" className="hover:text-slate-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-300">
            FAQ
          </a>
        </div>*/}
      </div>
    </footer>
  );
}
