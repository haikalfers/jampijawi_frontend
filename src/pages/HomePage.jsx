import {
  ArrowRight, PlayCircle, ShieldAlert, BookOpenCheck, Leaf, BadgeCheck, Brain, Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { articles } from "../lib/articles";

export default function HomePage() {
  const { t } = useLanguage();

  const masalah = [
    { icon: ShieldAlert, title: t("home.masalah1Title"), desc: t("home.masalah1Desc") },
    { icon: BookOpenCheck, title: t("home.masalah2Title"), desc: t("home.masalah2Desc") },
  ];

  const langkah = [
    { no: "01", title: t("home.langkah1Title"), desc: t("home.langkah1Desc") },
    { no: "02", title: t("home.langkah2Title"), desc: t("home.langkah2Desc") },
    { no: "03", title: t("home.langkah3Title"), desc: t("home.langkah3Desc") },
  ];

  const gejala = [
    { title: t("home.gejala1Title"), desc: t("home.gejala1Desc") },
    { title: t("home.gejala2Title"), desc: t("home.gejala2Desc") },
    { title: t("home.gejala3Title"), desc: t("home.gejala3Desc") },
    { title: t("home.gejala4Title"), desc: t("home.gejala4Desc") },
    { title: t("home.gejala5Title"), desc: t("home.gejala5Desc") },
    { title: t("home.gejala6Title"), desc: t("home.gejala6Desc") },
  ];

  return (
    <div className="bg-white text-stone-800">
      {/* ============ HERO ============ */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Sparkles size={14} /> {t("home.badge")}
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight text-stone-900">
            {t("home.heroTitle1")}<br />
            {t("home.heroTitle2")} <span className="text-emerald-700">{t("home.heroTitle3")}</span>
          </h1>

          <p className="mt-5 text-stone-500 max-w-lg">
            {t("home.heroDesc")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium px-5 py-3 rounded-xl transition">
              {t("home.ctaUtama")} <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center gap-2 text-stone-700 font-medium px-2 py-3">
              <PlayCircle size={18} /> {t("home.ctaSekunder")}
            </button>
          </div>

          <p className="mt-6 text-xs text-stone-400">
            {t("home.dasar")}
          </p>
        </div>

        <div className="bg-white border border-stone-100 rounded-3xl shadow-xl shadow-emerald-900/5 p-4">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1 pb-3">
            <span>{t("home.previewLabel")}</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {t("home.previewIlustrasi")}
            </span>
          </div>
          <img src="/jamu-kunyit-asam.jpeg" alt="Jamu Kunyit Asam" className="h-56 w-full rounded-2xl object-cover" />
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="bg-white border border-stone-200 rounded-full px-3 py-1 flex items-center gap-1">
              <BadgeCheck size={14} className="text-emerald-600" /> {t("home.previewBadge")}
            </span>
          </div>
          <div className="mt-4 border-t border-stone-100 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-stone-400">{t("home.previewKeluhanLabel")}</p>
              <p className="font-medium text-stone-800">{t("home.previewKeluhanValue")}</p>
            </div>
            <div>
              <p className="text-stone-400">{t("home.previewJenisLabel")}</p>
              <p className="font-medium text-stone-800">{t("home.previewJenisValue")}</p>
            </div>
          </div>
          <div className="mt-4 bg-emerald-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-emerald-700 uppercase tracking-wide">{t("home.previewRekomendasiLabel")}</p>
              <p className="text-sm font-medium text-emerald-900">{t("home.previewRekomendasiValue")}</p>
            </div>
            <BadgeCheck className="text-emerald-600" size={20} />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="relative rounded-2xl overflow-hidden min-h-105">
            <img
              src="/jamu-di-vogue.jpg"
              alt="Jamu"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-emerald-800/95 backdrop-blur text-white rounded-xl p-4">
                <Leaf size={18} />
                <p className="mt-2 font-semibold text-sm">{t("home.badge100")}</p>
                <p className="text-xs text-emerald-100 mt-1">{t("home.desc100")}</p>
              </div>
              <div className="flex-1 bg-white/95 backdrop-blur rounded-xl p-4">
                <BookOpenCheck size={18} className="text-emerald-700" />
                <p className="mt-2 font-semibold text-sm text-stone-800">{t("home.badgeTanaman")}</p>
                <p className="text-xs text-stone-500 mt-1">{t("home.descTanaman")}</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-red-600 tracking-wide">
              {t("home.masalahLabel")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">
              {t("home.masalahTitle1")} <span className="text-emerald-700">{t("home.masalahTitle2")}</span>
            </h2>
            <p className="mt-4 text-stone-500">
              {t("home.masalahDesc")}
            </p>

            <div className="mt-6 space-y-4">
              {masalah.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 bg-white border border-stone-200 rounded-2xl p-5">
                  <Icon className="text-red-500 shrink-0" size={22} />
                  <div>
                    <p className="font-semibold text-stone-800">{title}</p>
                    <p className="text-sm text-stone-500 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="mt-6 border-l-4 border-emerald-700 bg-emerald-50 rounded-r-xl px-5 py-4 text-sm text-stone-600 italic">
              "{t("home.quote")}"
              <footer className="mt-2 not-italic text-xs font-semibold text-stone-700">
                {t("home.quoteFooter")}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <span className="text-xs font-semibold text-emerald-700 tracking-wide">{t("home.caraKerjaLabel")}</span>
          <h2 className="mt-3 text-3xl font-bold text-stone-900">{t("home.caraKerjaTitle")}</h2>
          <p className="mt-3 text-stone-500">
            {t("home.caraKerjaDesc")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-6">
          {langkah.map(({ no, title, desc }) => (
            <div key={no} className="border border-stone-200 rounded-2xl p-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm">
                {no}
              </span>
              <p className="mt-4 font-semibold text-stone-800">{title}</p>
              <p className="text-sm text-stone-500 mt-2">{desc}</p>
              {no === "02" && (
                <div className="mt-4 bg-stone-900 text-stone-100 rounded-xl p-3 text-xs flex items-center gap-2">
                  <Brain size={16} className="text-emerald-400" />
                  <div>
                    <p className="text-stone-400">{t("home.contohHasilLabel")}</p>
                    <p>{t("home.contohHasilValue")}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 tracking-wide">{t("home.gejalaLabel")}</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900 max-w-md">
                {t("home.gejalaTitle")}
              </h2>
              <p className="mt-3 text-stone-500 max-w-lg text-sm">
                {t("home.gejalaDesc")}
              </p>
            </div>
            <a href="/keluhan" className="text-sm font-medium text-emerald-700 flex items-center gap-1">
              {t("home.gejalaLihatSemua")} <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gejala.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-stone-200 p-6">
                <p className="font-semibold text-stone-800">{title}</p>
                <p className="text-sm text-stone-500 mt-2">{desc}</p>
                <a href="/keluhan" className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-700 font-medium">
                  {t("home.gejalaCekRamuan")} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 tracking-wide">{t("home.artikelLabel")}</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900 max-w-md">
                {t("home.artikelTitle")}
              </h2>
              <p className="mt-3 text-stone-500 max-w-lg text-sm">
                {t("home.artikelDesc")}
              </p>
            </div>
            <a href="/artikel" className="text-sm font-medium text-emerald-700 flex items-center gap-1 shrink-0">
              {t("home.artikelLihatSemua")} <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-10 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 snap-x snap-mandatory">
              {articles.map(({ slug, image }, index) => (
                <a
                  key={slug}
                  href={`/artikel/${slug}`}
                  className="w-72 shrink-0 snap-start rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-200 transition bg-white"
                >
                  <img src={image} alt={t(`artikelData.${index}.judul`)} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <span className="text-[10px] font-medium text-emerald-700 uppercase">{t(`artikelData.${index}.kategori`)}</span>
                    <p className="mt-2 font-semibold text-stone-800">{t(`artikelData.${index}.judul`)}</p>
                    <p className="text-sm text-stone-500 mt-2">{t(`artikelData.${index}.desc`)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-linear-to-br from-emerald-800 to-emerald-950 rounded-3xl px-8 py-16 text-center text-white">
          <span className="text-xs font-semibold text-emerald-300 tracking-wide">{t("home.ctaLabel")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-4 text-emerald-100 max-w-lg mx-auto text-sm">
            {t("home.ctaDesc")}
          </p>
          <button className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-800 font-medium px-6 py-3 rounded-xl">
            {t("home.ctaButton")}
          </button>
        </div>
      </section>
    </div>
  );
}
