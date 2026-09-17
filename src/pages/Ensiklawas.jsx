import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { publicApi } from "../lib/axios";

const racikanFoto = {
  "jamu-kunyit-asam": "/jamu-kunyit-asam.jpeg",
  "jamu-beras-kencur": "/jamu-beras-kencur.jpg",
  "wedang-jahe-sereh": "/wedang-jahe-sereh.jpg",
  "air-rebusan-sambiloto": "/air-rebusan-sambiloto.jpg",
  "jamu-cabe-puyang": "/jamu-cabe-puyang.jpg",
  "jamu-pahitan": "/jamu-pahitan.jpg",
  "jamu-sinom": "/jamu-sinom.jpg",
  "jamu-uyup-uyup": "/jamu-uyup-uyup.jpg",
  "jamu-galian-singset": "/jamu-galian-singset.jpg",
  "wedang-uwuh": "/wedang-uwuh.jpg",
};

export default function EnsiklopediaPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("tanaman");
  const [query, setQuery] = useState("");
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHerbs();
  }, []);

  const fetchHerbs = async () => {
    try {
      const res = await publicApi.get("/herbs");
      setHerbs(res.data.herbs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const racikanList = Object.entries(racikanFoto).map(([slug, foto]) => ({
    slug,
    foto,
    nama: t(`racikanData.${slug}.nama`),
    desc: t(`racikanData.${slug}.desc`),
    tag: t(`racikanData.${slug}.tag`),
  }));

  const filteredHerbs = herbs.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRacikan = racikanList.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t("ensiklopedia.title")}
        </h1>
        <p className="mt-2 text-stone-500 max-w-xl">
          {t("ensiklopedia.desc")}
        </p>

        <div className="mt-6 inline-flex bg-stone-50 border border-stone-200 rounded-full p-1">
          <button
            onClick={() => setTab("tanaman")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "tanaman" ? "bg-emerald-800 text-white" : "text-stone-500"
            }`}
          >
            {t("ensiklopedia.tabTanaman")}
          </button>
          <button
            onClick={() => setTab("racikan")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "racikan" ? "bg-emerald-800 text-white" : "text-stone-500"
            }`}
          >
            {t("ensiklopedia.tabRacikan")}
          </button>
        </div>

        <div className="mt-5 max-w-xl flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-3">
          <Search size={16} className="text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ensiklopedia.searchPlaceholder")}
            className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-400"
          />
        </div>

        {tab === "tanaman" && (
          <>
            {loading ? (
              <p className="mt-10 text-center text-stone-400 text-sm">Memuat data tanaman...</p>
            ) : (
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredHerbs.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 transition block"
                  >
                    <img src={item.foto} alt={item.nama} className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <p className="font-semibold text-stone-800">{item.nama}</p>
                      <p className="text-xs text-stone-500 mt-2">{item.petunjuk}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.bahan.slice(0, 2).map((b) => (
                          <span key={b} className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2.5 py-1 rounded-full uppercase">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredHerbs.length === 0 && (
                  <p className="col-span-full text-center text-stone-400 text-sm py-10">
                    {t("ensiklopedia.tanamanKosong")}
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {tab === "racikan" && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRacikan.map((item) => (
              <Link
                key={item.slug}
                to={`/racikan/${item.slug}`}
                className="rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 transition block"
              >
                <img src={item.foto} alt={item.nama} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-stone-800">{item.nama}</p>
                  <p className="text-xs text-stone-500 mt-2">{item.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2.5 py-1 rounded-full uppercase">
                      {item.tag}
                    </span>
                    <span className="text-xs font-medium text-emerald-700">{t("ensiklopedia.lihat")} →</span>
                  </div>
                </div>
              </Link>
            ))}
            {filteredRacikan.length === 0 && (
              <p className="col-span-full text-center text-stone-400 text-sm py-10">
                {t("ensiklopedia.racikanKosong")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}