import { useState } from "react";
import { Plus, ChevronRight, Sparkles, X, Check, RotateCcw } from "lucide-react";
import { authApi } from "../lib/axios";

const kategoriList = [
  {
    id: "kepala", label: "Kepala, Pikiran & Saraf", dot: "bg-amber-700",
    symptoms: [
      { id: "pusing", title: "Pusing / Vertigo", desc: "Kepala berputar atau melayang" },
      { id: "migrain", title: "Sakit Kepala / Migrain", desc: "Nyeri sengkeram atau berdenyut" },
      { id: "konsentrasi", title: "Sulit Konsentrasi", desc: "Pikiran mudah teralihkan, sulit fokus" },
      { id: "gelisah", title: "Gelisah & Susah Istirahat Malam", desc: "Gelisah & susah istirahat malam" },
      { id: "lelahmental", title: "Mudah Lelah Mental", desc: "Cepat capek berpikir, mudah stres" },
    ],
  },
  {
    id: "dada", label: "Dada & Imun", dot: "bg-blue-600",
    symptoms: [
      { id: "batuk", title: "Batuk & Radang Tenggorokan", desc: "Tenggorokan kering, serak, gatal" },
      { id: "sesak", title: "Sesak / Napas Berat", desc: "Dada terasa berat saat bernapas" },
    ],
  },
  {
    id: "perut", label: "Perut & Metabolik", dot: "bg-emerald-600",
    symptoms: [
      { id: "mual", title: "Mual & Masuk Angin", desc: "Perut kembung, begah, bersendawa" },
      { id: "asamlambung", title: "Asam Lambung Naik", desc: "Rasa panas di ulu hati" },
    ],
  },
  {
    id: "sendi", label: "Sendi & Otot", dot: "bg-orange-500",
    symptoms: [
      { id: "pegal", title: "Badan Pegal & Linu", desc: "Kekakuan sendi punggung, leher, nyeri otot" },
    ],
  },
  {
    id: "ginjal", label: "Ginjal & Kemih", dot: "bg-teal-600",
    symptoms: [
      { id: "seringkencing", title: "Sering Buang Air Kecil", desc: "Frekuensi kemih meningkat tanpa sebab jelas" },
    ],
  },
  {
    id: "kulit", label: "Kulit & Topikal", dot: "bg-pink-600",
    symptoms: [
      { id: "gatal", title: "Gatal & Iritasi Kulit", desc: "Kemerahan atau gatal ringan pada kulit" },
    ],
  },
];

const severities = ["Ringan", "Sedang", "Parah"];

export default function KeluhanPage() {
  const [activeKategori, setActiveKategori] = useState(kategoriList[0]);
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [severity, setSeverity] = useState("Ringan");
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tersimpan, setTersimpan] = useState(false);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [loadingRamuan, setLoadingRamuan] = useState(false);

  const toggleGejala = (id) => {
    setSelectedGejala((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const visibleSymptoms = showAll ? activeKategori.symptoms : activeKategori.symptoms.slice(0, 3);
  const sisaGejala = activeKategori.symptoms.length - visibleSymptoms.length;

  const isBodyPartActive = (categoryId) => activeKategori.id === categoryId;

  const namaGejalaTerpilih = activeKategori.symptoms
    .filter((s) => selectedGejala.includes(s.id))
    .map((s) => s.title);

  const handleCariRamuan = async () => {
    setTersimpan(false);
    setLoadingRamuan(true);

    const symptomMap = {
      pusing: 1, migrain: 2, konsentrasi: 3, gelisah: 4,
      lelahmental: 5, batuk: 6, sesak: 7, mual: 8,
      asamlambung: 9, pegal: 10,
      seringkencing: 11, gatal: 12,
    };

    const symptomIds = selectedGejala.map((g) => symptomMap[g]).filter(Boolean);

    try {
      const res = await authApi.post("/symptoms/rekomendasi", { symptomIds });
      setRekomendasi(res.data.rekomendasi);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRamuan(false);
    }
  };

  const handleDeteksiUlang = () => {
    setShowModal(false);
    setSelectedGejala([]);
  };

  const handleSimpanJurnal = async (racikan) => {
    try {
      await authApi.post("/jurnal", {
        nama: racikan.nama,
        foto: racikan.foto,
        kategori: activeKategori.label,
        severity,
        gejala: namaGejalaTerpilih,
        dosis: racikan.untuk,
      });
      setTersimpan(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Catat Keluhan Mandiri
        </h1>
        <p className="mt-2 text-stone-500 max-w-xl">
          Pilih bagian tubuh, tentukan gejala yang dirasakan, dan dapatkan
          rekomendasi racikan jamu Jawa yang sesuai.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
          <div className="border border-stone-200 rounded-2xl p-6 lg:sticky lg:top-24">
            <p className="font-semibold text-stone-800">Fokus Area Tubuh</p>
            <span className="mt-3 inline-block bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm font-medium text-stone-700">
              {activeKategori.label}
            </span>

            <div className="relative mt-6 h-80 flex justify-center">
              <svg viewBox="0 0 200 380" className="h-full select-none">
                <g>
                  <circle
                    cx="100"
                    cy="40"
                    r="26"
                    fill={isBodyPartActive("kepala") ? "#fbbf24" : "#e7e5e4"}
                    stroke={isBodyPartActive("kepala") ? "#f59e0b" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[0])}
                  />
                  <circle cx="100" cy="40" r="5" fill="#6b7280" />
                </g>

                <g>
                  <rect
                    x="65"
                    y="70"
                    width="70"
                    height="110"
                    rx="20"
                    fill={isBodyPartActive("dada") ? "#60a5fa" : "#e7e5e4"}
                    stroke={isBodyPartActive("dada") ? "#3b82f6" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[1])}
                  />
                  <rect
                    x="76"
                    y="180"
                    width="48"
                    height="80"
                    rx="16"
                    fill={isBodyPartActive("perut") ? "#34d399" : "#e7e5e4"}
                    stroke={isBodyPartActive("perut") ? "#10b981" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[2])}
                  />
                  <rect
                    x="30"
                    y="80"
                    width="28"
                    height="110"
                    rx="14"
                    fill={isBodyPartActive("sendi") ? "#fb923c" : "#e7e5e4"}
                    stroke={isBodyPartActive("sendi") ? "#f97316" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[3])}
                  />
                  <rect
                    x="142"
                    y="80"
                    width="28"
                    height="110"
                    rx="14"
                    fill={isBodyPartActive("sendi") ? "#fb923c" : "#e7e5e4"}
                    stroke={isBodyPartActive("sendi") ? "#f97316" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[3])}
                  />
                  <rect
                    x="70"
                    y="180"
                    width="26"
                    height="150"
                    rx="13"
                    fill={isBodyPartActive("ginjal") ? "#2dd4bf" : "#e7e5e4"}
                    stroke={isBodyPartActive("ginjal") ? "#14b8a6" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[4])}
                  />
                  <rect
                    x="104"
                    y="180"
                    width="26"
                    height="150"
                    rx="13"
                    fill={isBodyPartActive("ginjal") ? "#2dd4bf" : "#e7e5e4"}
                    stroke={isBodyPartActive("ginjal") ? "#14b8a6" : "transparent"}
                    strokeWidth="4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[4])}
                  />
                </g>

                <g>
                  <circle
                    cx="100"
                    cy="110"
                    r="6"
                    fill={isBodyPartActive("dada") ? "#2563eb" : "#f1f5f9"}
                    stroke={isBodyPartActive("dada") ? "#1d4ed8" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[1])}
                  />
                  <circle
                    cx="100"
                    cy="170"
                    r="6"
                    fill={isBodyPartActive("perut") ? "#10b981" : "#f1f5f9"}
                    stroke={isBodyPartActive("perut") ? "#059669" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[2])}
                  />
                  <circle
                    cx="40"
                    cy="140"
                    r="6"
                    fill={isBodyPartActive("sendi") ? "#f97316" : "#f1f5f9"}
                    stroke={isBodyPartActive("sendi") ? "#ea580c" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[3])}
                  />
                  <circle
                    cx="160"
                    cy="150"
                    r="6"
                    fill={isBodyPartActive("sendi") ? "#f97316" : "#f1f5f9"}
                    stroke={isBodyPartActive("sendi") ? "#ea580c" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[3])}
                  />
                  <circle
                    cx="100"
                    cy="220"
                    r="6"
                    fill={isBodyPartActive("ginjal") ? "#14b8a6" : "#f1f5f9"}
                    stroke={isBodyPartActive("ginjal") ? "#0f766e" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[4])}
                  />
                  <circle
                    cx="100"
                    cy="260"
                    r="6"
                    fill={isBodyPartActive("kulit") ? "#ec4899" : "#f1f5f9"}
                    stroke={isBodyPartActive("kulit") ? "#db2777" : "#cbd5e1"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActiveKategori(kategoriList[5])}
                  />
                </g>
              </svg>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {kategoriList.map((k) => (
                <button
                  key={k.id}
                  onClick={() => { setActiveKategori(k); setShowAll(false); }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
                    activeKategori.id === k.id ? "bg-emerald-800 text-white border-emerald-800" : "bg-white text-stone-600 border-stone-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${k.dot}`} />
                  {k.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-stone-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-stone-800">{activeKategori.label}</p>
                <span className="bg-emerald-800 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {activeKategori.symptoms.length} Gejala
                </span>
              </div>
              <p className="text-sm text-stone-500 mt-1">Pilih gejala yang dirasakan pada bagian ini</p>

              <div className="mt-4 space-y-3">
                {visibleSymptoms.map((s) => {
                  const checked = selectedGejala.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleGejala(s.id)}
                      className="w-full flex items-center justify-between bg-white rounded-2xl border border-stone-200 px-5 py-4 text-left"
                    >
                      <div>
                        <p className="font-semibold text-stone-800">{s.title}</p>
                        <p className="text-sm text-stone-500">{s.desc}</p>
                      </div>
                      <span className={`w-5 h-5 rounded-md border shrink-0 ml-4 ${checked ? "bg-emerald-700 border-emerald-700" : "bg-stone-100 border-stone-300"}`} />
                    </button>
                  );
                })}

                {!showAll && sisaGejala > 0 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="w-full flex items-center justify-between bg-white rounded-2xl border border-emerald-200 px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                        <Plus size={16} />
                      </span>
                      <div>
                        <p className="font-semibold text-stone-800">+{sisaGejala} Gejala Lainnya</p>
                        <p className="text-sm text-stone-500">Buka semua daftar gejala bagian ini</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-stone-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="border border-stone-200 rounded-2xl p-6">
              <p className="font-semibold text-stone-800">Tingkat Keparahan Gejala</p>
              <p className="text-sm text-stone-500 mt-1">Seberapa parah gejala yang kamu rasakan?</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {severities.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSeverity(lvl)}
                    className={`py-3 rounded-full text-sm font-medium border transition ${
                      severity === lvl ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border border-stone-200 rounded-2xl p-6">
              <div>
                <p className="text-xs text-stone-400">Status Pilihan</p>
                <p className="font-semibold text-stone-800">
                  {selectedGejala.length === 0 ? "Belum Ada Gejala Dipilih" : `${selectedGejala.length} Gejala Dipilih`}
                </p>
              </div>
              <button
                disabled={selectedGejala.length === 0 || loadingRamuan}
                onClick={handleCariRamuan}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
                  selectedGejala.length > 0 ? "bg-emerald-800 text-white hover:bg-emerald-900" : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                {loadingRamuan ? "Mencari..." : `Cari Ramuan (${selectedGejala.length})`} <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && rekomendasi.length > 0 && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="relative h-48">
            <img src={rekomendasi[0].foto} alt={rekomendasi[0].nama} className="h-full w-full object-cover rounded-t-3xl" />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <span className="bg-white/90 text-xs font-medium px-3 py-1 rounded-full">
                {rekomendasi[0].tag}
              </span>
              <span className="bg-white/90 text-xs font-medium px-3 py-1 rounded-full">
                ⏱ {rekomendasi[0].waktu}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-stone-900">Rekomendasi Racikan</h2>
            <p className="text-sm text-stone-500 mt-1">Berdasarkan gejala yang kamu pilih</p>

            {/* Gejala Target */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-stone-500 uppercase">Gejala Target</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {namaGejalaTerpilih.map((g) => (
                  <span key={g} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Check size={12} /> {g}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Rekomendasi */}
            <div className="mt-5 space-y-4">
              {rekomendasi.map((racikan, index) => (
                <div key={racikan.id} className={`border rounded-2xl p-4 ${index === 0 ? "border-emerald-300 bg-emerald-50" : "border-stone-200"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${index === 0 ? "bg-emerald-800 text-white" : "bg-stone-200 text-stone-600"}`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900">{racikan.nama}</p>
                      <p className="text-xs text-stone-500">{racikan.untuk}</p>
                    </div>
                    {index === 0 && (
                      <span className="text-xs bg-emerald-800 text-white px-2 py-1 rounded-full shrink-0">
                        Terbaik
                      </span>
                    )}
                  </div>

                  {/* Bahan */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase">Bahan</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {racikan.bahan.map((b) => (
                        <span key={b} className="bg-white border border-stone-200 text-stone-600 text-xs px-3 py-1 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Langkah */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-stone-500 uppercase">Cara Membuat</p>
                    <ol className="mt-1.5 space-y-1">
                      {racikan.langkah.map((l, i) => (
                        <li key={i} className="text-xs text-stone-600 flex gap-2">
                          <span className="shrink-0 font-semibold text-emerald-700">{i + 1}.</span>
                          {l}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tombol Simpan */}
                  <button
                    onClick={() => handleSimpanJurnal(racikan)}
                    disabled={tersimpan}
                    className={`mt-3 w-full inline-flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl text-sm transition ${
                      tersimpan ? "bg-emerald-50 text-emerald-700" : "bg-emerald-800 text-white hover:bg-emerald-900"
                    }`}
                  >
                    {tersimpan ? (
                      <><Check size={14} /> Tersimpan di Jurnal</>
                    ) : (
                      <>Simpan ke Jurnal →</>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Deteksi Ulang */}
            <button
              onClick={handleDeteksiUlang}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-medium py-3 rounded-xl text-sm"
            >
              <RotateCcw size={16} /> Deteksi Ulang
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}