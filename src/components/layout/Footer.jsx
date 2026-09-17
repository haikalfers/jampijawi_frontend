import { Link } from "react-router-dom";
import { Leaf, Mail, Globe, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const menuUtama = [
    { label: t("nav.beranda"), to: "/" },
    { label: t("nav.deteksi"), to: "/keluhan" },
    { label: t("nav.ensiklopedia"), to: "/ensiklopedia" },
    { label: t("footer.profil"), to: "/profil" },
  ];

  return (
    <footer className="bg-[#0b1d17] text-stone-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 font-semibold text-white">
            <span className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center">
              <Leaf size={14} className="text-white" />
            </span>
            Jampi Jawi
          </div>
          <p className="mt-4 text-sm text-stone-400 max-w-xs">
            {t("footer.deskripsi")}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-emerald-400 tracking-wide mb-4">
            {t("footer.menuUtama")}
          </p>
          <ul className="space-y-2 text-sm">
            {menuUtama.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-stone-400 hover:text-white transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-emerald-400 tracking-wide mb-4">
            {t("footer.kontak")}
          </p>
          <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex items-center gap-2">
              <Mail size={14} /> jampijawi@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Globe size={14} /> jampijawi-frontend.vercel.app
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} /> Surabaya, Indonesia
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>© 2026 Jampi Jawi. {t("footer.hakCipta")}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">{t("footer.kebijakan")}</a>
            <a href="#" className="hover:text-white">{t("footer.syarat")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
