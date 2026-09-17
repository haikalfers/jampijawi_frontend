import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../lib/articles";

export default function DetailArtikelPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const articleIndex = articles.findIndex((article) => article.slug === slug);

  if (articleIndex === -1) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-900">Artikel tidak ditemukan</h1>
        <Link to="/artikel" className="mt-5 inline-flex text-emerald-700 font-medium">
          Kembali ke daftar artikel
        </Link>
      </div>
    );
  }

  const article = articles[articleIndex];
  const title = t(`artikelData.${articleIndex}.judul`);
  const category = t(`artikelData.${articleIndex}.kategori`);
  const description = t(`artikelData.${articleIndex}.desc`);

  return (
    <article className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/artikel" className="inline-flex items-center gap-2 text-sm text-emerald-700 font-medium">
          <ArrowLeft size={16} />
          {t("home.artikelLabel")}
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl bg-white border border-stone-200">
          <img src={article.image} alt={title} className="h-64 sm:h-80 w-full object-cover" />
          <div className="p-6 sm:p-10">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              {category}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">{description}</p>
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
              <p className="mt-3 text-stone-600 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}