import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Trash2, Sun, Moon } from "lucide-react";
import { authApi } from "../lib/axios";

export default function JurnalResepPage() {
  const [jurnal, setJurnal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJurnal();
  }, []);

  const fetchJurnal = async () => {
    try {
      const res = await authApi.get("/jurnal");
      setJurnal(res.data.jurnal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDosis = async (id, waktu) => {
    const item = jurnal.find((j) => j.id === id);
    const value = !item.selesai_hari_ini?.[waktu];

    // Update UI dulu (optimistic update)
    setJurnal((prev) =>
      prev.map((j) =>
        j.id === id
          ? { ...j, selesai_hari_ini: { ...j.selesai_hari_ini, [waktu]: value } }
          : j
      )
    );

    try {
      await authApi.patch(`/jurnal/${id}/toggle`, { waktu, value });
    } catch (error) {
      console.error(error);
    }
  };

  const hapusItem = async (id) => {
    setJurnal((prev) => prev.filter((j) => j.id !== id));
    try {
      await authApi.delete(`/jurnal/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-stone-400">Memuat jurnal...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Jurnal Resep Saya
        </h1>
        <p className="mt-2 text-stone-500 max-w-xl">
          Catat perkembangan fisik, pantau rutinitas konsumsi herbal, dan
          kelola ramuan jamu Jawa yang sedang kamu jalani.
        </p>

        {jurnal.length === 0 ? (
          <div className="mt-10 border border-stone-200 rounded-2xl p-10 text-center">
            <BookOpen size={32} className="mx-auto text-stone-300" />
            <p className="mt-3 font-semibold text-stone-800">Belum ada ramuan tersimpan</p>
            <p className="mt-1 text-sm text-stone-500">
              Cek keluhanmu dan simpan racikan yang direkomendasikan ke jurnal ini.
            </p>
            <Link
              to="/keluhan"
              className="mt-5 inline-block bg-emerald-800 text-white font-medium px-5 py-3 rounded-xl text-sm"
            >
              Mulai Cek Keluhan
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-5">
            {jurnal.map((item) => (
              <div key={item.id} className="border border-stone-200 rounded-2xl overflow-hidden">
                <div className="flex gap-4 p-5">
                  <img src={item.foto} alt={item.nama} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-stone-900">{item.nama}</p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {item.kategori} · Tingkat {item.severity}
                        </p>
                      </div>
                      <button onClick={() => hapusItem(item.id)} className="text-stone-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {item.gejala?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.gejala.map((g) => (
                          <span key={g} className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-full">
                            {g}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-2 text-xs text-stone-500">{item.dosis}</p>
                  </div>
                </div>

                <div className="border-t border-stone-100 px-5 py-3 flex items-center gap-3">
                  <p className="text-xs text-stone-400 mr-2">Progres hari ini:</p>
                  <button
                    onClick={() => toggleDosis(item.id, "pagi")}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                      item.selesai_hari_ini?.pagi
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : "bg-white text-stone-500 border-stone-200"
                    }`}
                  >
                    <Sun size={12} /> Dosis Pagi
                  </button>
                  <button
                    onClick={() => toggleDosis(item.id, "malam")}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                      item.selesai_hari_ini?.malam
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : "bg-white text-stone-500 border-stone-200"
                    }`}
                  >
                    <Moon size={12} /> Dosis Malam
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}