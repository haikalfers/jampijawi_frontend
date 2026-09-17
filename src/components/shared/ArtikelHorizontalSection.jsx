import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ArtikelHorizontalSection({ artikel }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const raw = -rect.top / scrollableHeight;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const maxTranslate = trackRef.current
    ? trackRef.current.scrollWidth - window.innerWidth
    : 0;

  const translateX = -(progress * maxTranslate);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 tracking-wide">ARTIKEL & EDUKASI</span>
              <h2 className="mt-3 text-3xl font-bold text-stone-900 max-w-md">
                Belajar Lebih Dalam Soal Jamu Jawa
              </h2>
              <p className="mt-3 text-stone-500 max-w-lg text-sm">
                Kumpulan artikel seputar cara meramu jamu, tips penggunaan
                herbal yang aman, dan cerita di balik tradisi jamu Jawa.
              </p>
            </div>
            <a href="/artikel" className="text-sm font-medium text-emerald-700 flex items-center gap-1 shrink-0">
              Lihat Semua Artikel <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 pl-6 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {artikel.map(({ judul, kategori, desc }) => (
              <a
                key={judul}
                href="/artikel"
                className="w-72 shrink-0 rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-200 transition bg-white"
              >
                <div className="h-40 bg-linear-to-br from-amber-100 to-emerald-100" />
                <div className="p-5">
                  <span className="text-[10px] font-medium text-emerald-700 uppercase">{kategori}</span>
                  <p className="mt-2 font-semibold text-stone-800">{judul}</p>
                  <p className="text-sm text-stone-500 mt-2">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}