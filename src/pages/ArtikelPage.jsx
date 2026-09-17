import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../lib/articles";

export default function ArtikelPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-emerald-700 tracking-wide">
            {t("home.artikelLabel")}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900">
            {t("home.artikelTitle")}
          </h1>
          <p className="mt-3 text-stone-500">{t("home.artikelDesc")}</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(({ slug, image }, index) => (
            <Link
              key={slug}
              to={`/artikel/${slug}`}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <img
                src={image}
                alt={t(`artikelData.${index}.judul`)}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <span className="text-[10px] font-medium text-emerald-700 uppercase">
                  {t(`artikelData.${index}.kategori`)}
                </span>
                <h2 className="mt-2 font-semibold text-stone-800">
                  {t(`artikelData.${index}.judul`)}
                </h2>
                <p className="mt-2 text-sm text-stone-500 line-clamp-3">
                  {t(`artikelData.${index}.desc`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                  {t("home.artikelLihatSemua")} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
