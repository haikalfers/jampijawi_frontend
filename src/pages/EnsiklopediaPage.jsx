import { useState } from "react";
import { Search, X, Clock, Leaf, Droplets } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// ─── Data Tanaman ────────────────────────────────────────────────────────────
const tanamanList = [
  {
    id: "kunyit",
    nama: "Kunyit",
    desc: "Rimpang kuning kaya kurkumin, dipakai turun-temurun sebagai anti radang dan penjaga daya tahan tubuh.",
    tag: "Herbal Jawa",
    foto: "/kunyit.png",
    deskripsi:
      "Kunyit adalah rimpang berwarna kuning cerah yang menjadi salah satu bahan paling dikenal dalam jamu Jawa, terutama sebagai bahan utama jamu kunyit asam.",
    manfaat:
      "Membantu meredakan peradangan ringan, menjaga daya tahan tubuh, dan membantu meredakan nyeri haid.",
    cara_penggunaan:
      "Biasanya direbus atau diparut, dicampur air hangat dan sedikit asam jawa atau madu.",
    dosis_anjuran:
      "1–2 ruas (sekitar 5–10 gram) per penyeduhan, tidak lebih dari 2 kali sehari.",
    efek_samping:
      "Konsumsi berlebihan dapat menyebabkan gangguan lambung pada sebagian orang.",
  },
  {
    id: "temulawak",
    nama: "Temulawak",
    desc: "Rimpang khas Jawa yang melindungi fungsi hati dan membantu melancarkan pencernaan.",
    tag: "Herbal Jawa",
    foto: "/temulawak.jpg",
    deskripsi:
      "Temulawak adalah rimpang khas Jawa yang mirip kunyit namun ukurannya lebih besar dan warnanya lebih pucat.",
    manfaat: "Dipercaya membantu menjaga fungsi hati dan melancarkan pencernaan.",
    cara_penggunaan: "Direbus dengan air hingga mendidih, biasa dikonsumsi hangat.",
    dosis_anjuran: "2–3 ruas per penyeduhan, 1 kali sehari.",
    efek_samping:
      "Jarang, namun konsumsi berlebihan dapat memicu rasa mual pada sebagian orang.",
  },
  {
    id: "kencur",
    nama: "Kencur",
    desc: "Rimpang aromatik untuk melegakan tenggorokan dan memulihkan stamina setelah lelah.",
    tag: "Herbal Jawa",
    foto: "/kencur.jpg",
    deskripsi:
      "Kencur adalah rimpang aromatik berukuran kecil yang menjadi bahan utama jamu beras kencur, salah satu jamu paling populer di Jawa.",
    manfaat:
      "Melegakan tenggorokan, membantu memulihkan stamina, dan meningkatkan nafsu makan.",
    cara_penggunaan:
      "Ditumbuk halus, dicampur dengan beras rendaman, lalu disaring dan diminum.",
    dosis_anjuran: "2–3 ruas per penyeduhan, 1 kali sehari.",
    efek_samping:
      "Konsumsi berlebihan dapat menyebabkan rasa panas di tenggorokan pada sebagian orang.",
  },
  {
    id: "jahe",
    nama: "Jahe",
    desc: "Rimpang penghangat tubuh, andalan jamu Jawa untuk melawan masuk angin dan mual.",
    tag: "Herbal Jawa",
    foto: "/jahe.jpeg",
    deskripsi:
      "Jahe adalah rimpang penghangat tubuh yang sudah menjadi andalan dapur dan jamu Jawa sejak lama, terutama untuk melawan masuk angin.",
    manfaat:
      "Meredakan mual, masuk angin, dan membantu menghangatkan tubuh saat cuaca dingin.",
    cara_penggunaan:
      "Digeprek atau diiris, lalu direbus dengan air dan biasa ditambahkan gula merah.",
    dosis_anjuran:
      "1 ruas (sekitar 5 gram) per penyeduhan, bisa diminum 1–2 kali sehari.",
    efek_samping:
      "Konsumsi berlebihan dapat menyebabkan rasa panas di lambung pada beberapa orang.",
  },
  {
    id: "daun-sirih",
    nama: "Daun Sirih",
    desc: "Daun antiseptik alami, dipakai untuk kebersihan mulut dan perawatan luka ringan.",
    tag: "Herbal Jawa",
    foto: "/daun-sirih.jpg",
    deskripsi:
      "Daun sirih dikenal luas dalam tradisi Jawa sebagai daun dengan sifat antiseptik alami, sering dipakai dalam ritual kebersihan mulut dan perawatan luka.",
    manfaat:
      "Membantu menjaga kebersihan mulut, meredakan iritasi ringan, dan membantu perawatan luka kecil.",
    cara_penggunaan:
      "Direbus dengan air panas, air rebusannya digunakan untuk berkumur atau membasuh area yang membutuhkan.",
    dosis_anjuran:
      "3–5 lembar daun per penyeduhan, digunakan luaran (bukan diminum).",
    efek_samping:
      "Penggunaan berlebihan pada kulit sensitif dapat menyebabkan iritasi ringan.",
  },
  {
    id: "asam-jawa",
    nama: "Asam Jawa",
    desc: "Buah asam kaya vitamin C, penyegar sekaligus penyeimbang rasa pada ramuan jamu.",
    tag: "Herbal Jawa",
    foto: "/asam-jawa.jpg",
    deskripsi:
      "Asam jawa adalah buah polong dengan rasa asam khas yang menjadi bahan penyeimbang rasa dalam banyak racikan jamu, terutama jamu kunyit asam.",
    manfaat:
      "Menyegarkan tubuh, membantu pencernaan, dan menyeimbangkan rasa pahit pada racikan jamu.",
    cara_penggunaan:
      "Direndam atau direbus bersama bahan lain, air sarinya diambil untuk campuran jamu.",
    dosis_anjuran: "2–3 sendok makan daging buah per penyeduhan.",
    efek_samping:
      "Konsumsi berlebihan dapat memicu rasa asam berlebih di lambung.",
  },
  {
    id: "daun-kelor",
    nama: "Daun Kelor",
    desc: "Daun kaya zat besi dan mineral, penunjang imunitas keluarga Jawa sehari-hari.",
    tag: "Herbal Jawa",
    foto: "/daun-kelor.jpg",
    deskripsi:
      "Daun kelor adalah daun kaya nutrisi yang tumbuh subur di banyak pekarangan rumah Jawa, sering diolah menjadi sayur bening maupun jamu.",
    manfaat:
      "Membantu menjaga imunitas tubuh dan memenuhi kebutuhan zat besi serta mineral harian.",
    cara_penggunaan:
      "Direbus sebentar dengan air, air rebusannya diminum hangat atau daunnya diolah menjadi sayur.",
    dosis_anjuran: "Segenggam daun segar per penyeduhan.",
    efek_samping:
      "Aman dikonsumsi dalam jumlah wajar, konsumsi berlebihan jarang dilaporkan menimbulkan efek samping.",
  },
  {
    id: "lengkuas",
    nama: "Lengkuas",
    desc: "Rimpang penghangat berkhasiat antimikroba, sering dipadukan dalam racikan pegal linu.",
    tag: "Herbal Jawa",
    foto: "/lengkuas.jpg",
    deskripsi:
      "Lengkuas adalah rimpang penghangat yang sering dipakai baik sebagai bumbu dapur maupun bahan racikan jamu pegal linu.",
    manfaat: "Membantu meredakan pegal linu dan memiliki sifat antimikroba alami.",
    cara_penggunaan:
      "Dihaluskan atau digeprek, dicampur bahan lain untuk dibuat param atau direbus untuk diminum.",
    dosis_anjuran: "1–2 ruas per penggunaan.",
    efek_samping:
      "Penggunaan pada kulit sensitif dalam bentuk param dapat menyebabkan rasa hangat berlebih.",
  },
  {
    id: "sambiloto",
    nama: "Sambiloto",
    desc: "Daun pahit legendaris untuk menurunkan panas dan meredakan radang tenggorokan.",
    tag: "Herbal Jawa",
    foto: "/sambiloto.jpeg",
    deskripsi:
      "Sambiloto adalah daun dengan rasa pahit yang sangat legendaris di kalangan penjual jamu gendong, dikenal sebagai bahan utama jamu pahitan.",
    manfaat: "Membantu menurunkan panas tubuh dan meredakan radang tenggorokan.",
    cara_penggunaan:
      "Direbus dengan air hingga mendidih, disaring, dan diminum selagi hangat meski rasanya pahit.",
    dosis_anjuran:
      "Segenggam daun kering per penyeduhan, tidak lebih dari 1 kali sehari.",
    efek_samping:
      "Konsumsi berlebihan dan jangka panjang sebaiknya dihindari tanpa anjuran yang tepat.",
  },
];

// ─── Data Racikan ─────────────────────────────────────────────────────────────
const racikanList = [
  {
    id: "jamu-kunyit-asam",
    nama: "Jamu Kunyit Asam",
    desc: "Untuk: pegal haid, panas dalam, lemas. Rebus 3 ruas kunyit memarkan dengan 2 gelas air dan asam jawa selama 15 menit. Saring, minum hangat.",
    tag: "Jamu segar",
    foto: "/jamu-kunyit-asam.jpeg",
    untuk: "Pegal haid, panas dalam, lemas",
    bahan: ["3 ruas kunyit, memarkan", "2 gelas air", "3 sdm asam jawa", "Gula aren secukupnya"],
    langkah: [
      "Rebus kunyit yang sudah dimemarkan dengan 2 gelas air.",
      "Masukkan asam jawa, rebus selama 15 menit hingga tercampur rata.",
      "Tambahkan gula aren, aduk hingga larut.",
      "Saring, sajikan hangat atau dingin sesuai selera.",
    ],
    waktu: "±20 menit",
  },
  {
    id: "jamu-beras-kencur",
    nama: "Jamu Beras Kencur",
    desc: "Untuk: pegal linu, lesu, nafsu makan menurun. Tumbuk kencur dan beras rendaman, tambahkan air, saring, campur gula jawa.",
    tag: "Jamu stamina",
    foto: "/jamu-beras-kencur.jpg",
    untuk: "Pegal linu, lesu, nafsu makan menurun",
    bahan: ["3 ruas kencur", "2 sdm beras, rendam 30 menit", "2 gelas air", "Gula jawa secukupnya"],
    langkah: [
      "Tumbuk kencur dan beras yang sudah direndam hingga halus.",
      "Tambahkan air sedikit demi sedikit sambil terus ditumbuk.",
      "Saring campuran, ambil sarinya.",
      "Campurkan dengan gula jawa yang sudah dicairkan, aduk rata.",
    ],
    waktu: "±25 menit",
  },
  {
    id: "wedang-jahe-sereh",
    nama: "Wedang Jahe Sereh",
    desc: "Untuk: masuk angin, mual, badan dingin. Rebus jahe geprek dan sereh dengan air selama 10 menit, tambahkan gula merah.",
    tag: "Jamu hangat",
    foto: "/wedang-jahe-sereh.jpg",
    untuk: "Masuk angin, mual, badan dingin",
    bahan: ["1 ruas jahe, geprek", "1 batang sereh, geprek", "2 gelas air", "Gula merah secukupnya"],
    langkah: [
      "Rebus jahe dan sereh yang sudah digeprek dengan 2 gelas air.",
      "Masak selama 10 menit hingga aroma keluar.",
      "Tambahkan gula merah, aduk hingga larut.",
      "Saring, sajikan selagi hangat.",
    ],
    waktu: "±15 menit",
  },
  {
    id: "air-rebusan-sambiloto",
    nama: "Air Rebusan Sambiloto",
    desc: "Untuk: demam, radang tenggorokan, panas dalam. Rebus daun sambiloto kering hingga tersisa 1 gelas, saring, minum hangat.",
    tag: "Jamu demam",
    foto: "/air-rebusan-sambiloto.jpg",
    untuk: "Demam, radang tenggorokan, panas dalam",
    bahan: ["Segenggam daun sambiloto kering", "3 gelas air"],
    langkah: [
      "Rebus daun sambiloto kering dengan 3 gelas air.",
      "Masak hingga air tersisa sekitar 1 gelas.",
      "Saring air rebusan.",
      "Minum selagi hangat meski rasanya pahit.",
    ],
    waktu: "±20 menit",
  },
  {
    id: "jamu-cabe-puyang",
    nama: "Jamu Cabe Puyang",
    desc: "Untuk: pegal linu, sakit pinggang, capek kerja fisik. Tumbuk cabe jawa dan lempuyang, rebus dengan air, saring, minum hangat.",
    tag: "Jamu pegal",
    foto: "/jamu-cabe-puyang.jpg",
    untuk: "Pegal linu, sakit pinggang, capek kerja fisik",
    bahan: ["5 buah cabe jawa", "2 ruas lempuyang", "2 gelas air"],
    langkah: [
      "Tumbuk cabe jawa dan lempuyang hingga agak halus.",
      "Rebus dengan 2 gelas air selama 15 menit.",
      "Saring air rebusan.",
      "Minum hangat, terutama setelah kerja fisik berat.",
    ],
    waktu: "±20 menit",
  },
  {
    id: "jamu-pahitan",
    nama: "Jamu Pahitan",
    desc: "Untuk: menjaga daya tahan tubuh, membersihkan darah. Rebus daun sambiloto, brotowali, dan sedikit temulawak hingga mendidih, saring, minum meski pahit.",
    tag: "Jamu daya tahan",
    foto: "/jamu-pahitan.jpg",
    untuk: "Menjaga daya tahan tubuh, membersihkan darah",
    bahan: ["Segenggam daun sambiloto", "2 ruas brotowali", "1 ruas temulawak", "3 gelas air"],
    langkah: [
      "Rebus sambiloto, brotowali, dan temulawak bersamaan.",
      "Masak hingga mendidih dan air agak menyusut.",
      "Saring air rebusan.",
      "Minum meski rasanya pahit, biasa diminum rutin dalam jumlah kecil.",
    ],
    waktu: "±25 menit",
  },
  {
    id: "jamu-sinom",
    nama: "Jamu Sinom",
    desc: "Untuk: penyegar, pencernaan, penurun panas dalam. Rebus daun asam muda (sinom), kunyit, dan asam jawa dengan gula aren hingga harum.",
    tag: "Jamu segar",
    foto: "/jamu-sinom.jpg",
    untuk: "Penyegar, pencernaan, penurun panas dalam",
    bahan: ["Segenggam daun asam muda (sinom)", "2 ruas kunyit", "2 sdm asam jawa", "Gula aren secukupnya", "3 gelas air"],
    langkah: [
      "Rebus daun sinom, kunyit, dan asam jawa bersama air.",
      "Masak hingga mendidih dan harum.",
      "Tambahkan gula aren, aduk hingga larut.",
      "Saring, sajikan dingin atau hangat.",
    ],
    waktu: "±20 menit",
  },
  {
    id: "jamu-uyup-uyup",
    nama: "Jamu Uyup-Uyup",
    desc: "Untuk: melancarkan ASI, pemulihan ibu menyusui. Rebus campuran kunyit, temulawak, dan kencur, biasa diminum ibu pasca melahirkan.",
    tag: "Jamu ibu menyusui",
    foto: "/jamu-uyup-uyup.jpg",
    untuk: "Melancarkan ASI, pemulihan ibu menyusui",
    bahan: ["2 ruas kunyit", "2 ruas temulawak", "2 ruas kencur", "3 gelas air"],
    langkah: [
      "Rebus kunyit, temulawak, dan kencur bersamaan.",
      "Masak dengan api kecil selama 20 menit.",
      "Saring air rebusan.",
      "Minum hangat, biasa dikonsumsi rutin oleh ibu pasca melahirkan.",
    ],
    waktu: "±25 menit",
  },
  {
    id: "jamu-galian-singset",
    nama: "Jamu Galian Singset",
    desc: "Untuk: menjaga bentuk tubuh, melancarkan metabolisme. Racikan kunyit, asam jawa, dan kayu manis, diminum rutin pagi hari.",
    tag: "Jamu metabolisme",
    foto: "/jamu-galian-singset.jpg",
    untuk: "Menjaga bentuk tubuh, melancarkan metabolisme",
    bahan: ["2 ruas kunyit", "2 sdm asam jawa", "1 batang kayu manis", "2 gelas air"],
    langkah: [
      "Rebus kunyit, asam jawa, dan kayu manis bersama air.",
      "Masak selama 15 menit hingga aroma keluar.",
      "Saring air rebusan.",
      "Minum rutin di pagi hari sebelum makan.",
    ],
    waktu: "±20 menit",
  },
  {
    id: "wedang-uwuh",
    nama: "Wedang Uwuh",
    desc: "Untuk: menghangatkan badan, relaksasi, masuk angin ringan. Rebus ranting kayu secang, cengkeh, kayu manis, dan jahe hingga air berwarna merah.",
    tag: "Jamu hangat",
    foto: "/wedang-uwuh.jpg",
    untuk: "Menghangatkan badan, relaksasi, masuk angin ringan",
    bahan: ["Beberapa ranting kayu secang", "3 butir cengkeh", "1 batang kayu manis", "1 ruas jahe", "Gula batu secukupnya"],
    langkah: [
      "Rebus kayu secang, cengkeh, kayu manis, dan jahe bersama air.",
      "Masak hingga air berubah warna merah dan harum rempah keluar.",
      "Tambahkan gula batu, aduk hingga larut.",
      "Saring, sajikan hangat selagi masih panas.",
    ],
    waktu: "±20 menit",
  },
];

// ─── Modal Tanaman ────────────────────────────────────────────────────────────
function TanamanModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Foto */}
        <div className="relative h-48 w-full">
          <img
            src={item.foto}
            alt={item.nama}
            className="h-full w-full object-cover rounded-t-3xl"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent rounded-t-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-1.5 transition"
          >
            <X size={16} className="text-stone-700" />
          </button>
          <div className="absolute bottom-4 left-5">
            <span className="text-[10px] font-semibold bg-emerald-700 text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
              {item.tag}
            </span>
            <h2 className="mt-1.5 text-2xl font-bold text-white">{item.nama}</h2>
          </div>
        </div>

        {/* Konten */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-stone-600 leading-relaxed">{item.deskripsi}</p>

          <DetailRow icon={<Leaf size={14} />} label="Manfaat" value={item.manfaat} />
          <DetailRow icon={<Droplets size={14} />} label="Cara Penggunaan" value={item.cara_penggunaan} />

          <div className="bg-emerald-50 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Dosis Anjuran</p>
            <p className="text-sm text-emerald-900">{item.dosis_anjuran}</p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Efek Samping</p>
            <p className="text-sm text-amber-900">{item.efek_samping}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Racikan ────────────────────────────────────────────────────────────
function RacikanModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Foto */}
        <div className="relative h-48 w-full">
          <img
            src={item.foto}
            alt={item.nama}
            className="h-full w-full object-cover rounded-t-3xl"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent rounded-t-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-1.5 transition"
          >
            <X size={16} className="text-stone-700" />
          </button>
          <div className="absolute bottom-4 left-5">
            <span className="text-[10px] font-semibold bg-emerald-700 text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
              {item.tag}
            </span>
            <h2 className="mt-1.5 text-2xl font-bold text-white">{item.nama}</h2>
          </div>
        </div>

        {/* Konten */}
        <div className="p-6 space-y-5">
          {/* Untuk & Waktu */}
          <div className="flex items-start gap-3">
            <div className="flex-1 bg-emerald-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">Untuk</p>
              <p className="text-sm text-emerald-900">{item.untuk}</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-4 text-center min-w-22.5">
              <Clock size={14} className="text-stone-400 mx-auto mb-1" />
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Waktu</p>
              <p className="text-sm font-bold text-stone-700 mt-0.5">{item.waktu}</p>
            </div>
          </div>

          {/* Bahan */}
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Bahan-bahan</p>
            <ul className="space-y-1.5">
              {item.bahan.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Langkah */}
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Cara Membuat</p>
            <ol className="space-y-3">
              {item.langkah.map((l, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 h-5 w-5 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed">{l}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function DetailRow({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-emerald-700">{icon}</span>
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-sm text-stone-700 leading-relaxed">{value}</p>
    </div>
  );
}

// ─── Card Tanaman ─────────────────────────────────────────────────────────────
function TanamanCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 bg-white w-full"
    >
      <div className="h-36 w-full bg-stone-100 overflow-hidden">
        <img
          src={item.foto}
          alt={item.nama}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.parentElement.classList.add("flex", "items-center", "justify-center");
            e.target.style.display = "none";
            const fallback = document.createElement("span");
            fallback.textContent = "🌿";
            fallback.className = "text-3xl";
            e.target.parentElement.appendChild(fallback);
          }}
        />
      </div>
      <div className="p-4">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2">
          {item.tag}
        </span>
        <p className="font-semibold text-stone-800">{item.nama}</p>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
        <p className="mt-3 text-xs font-medium text-emerald-700">Lihat detail →</p>
      </div>
    </button>
  );
}

// ─── Card Racikan ─────────────────────────────────────────────────────────────
function RacikanCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl overflow-hidden border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 bg-white w-full"
    >
      <div className="h-40 w-full bg-stone-100 overflow-hidden">
        <img
          src={item.foto}
          alt={item.nama}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.parentElement.classList.add("flex", "items-center", "justify-center");
            e.target.style.display = "none";
            const fallback = document.createElement("span");
            fallback.textContent = "🍵";
            fallback.className = "text-3xl";
            e.target.parentElement.appendChild(fallback);
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-stone-400">
            <Clock size={10} />
            {item.waktu}
          </span>
        </div>
        <p className="font-semibold text-stone-800">{item.nama}</p>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
        <p className="mt-3 text-xs font-medium text-emerald-700">Lihat resep →</p>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EnsiklopediaPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("tanaman");
  const [query, setQuery] = useState("");
  const [selectedTanaman, setSelectedTanaman] = useState(null);
  const [selectedRacikan, setSelectedRacikan] = useState(null);

  const filteredTanaman = tanamanList.filter((item) =>
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

        {/* Tab */}
        <div className="mt-6 inline-flex bg-stone-50 border border-stone-200 rounded-full p-1">
          <button
            onClick={() => { setTab("tanaman"); setQuery(""); }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "tanaman" ? "bg-emerald-800 text-white" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {t("ensiklopedia.tabTanaman")}
          </button>
          <button
            onClick={() => { setTab("racikan"); setQuery(""); }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "racikan" ? "bg-emerald-800 text-white" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {t("ensiklopedia.tabRacikan")}
          </button>
        </div>

        {/* Search */}
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

        {/* Tab: Tanaman */}
        {tab === "tanaman" && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTanaman.map((item) => (
              <TanamanCard
                key={item.id}
                item={item}
                onClick={() => setSelectedTanaman(item)}
              />
            ))}
            {filteredTanaman.length === 0 && (
              <p className="col-span-full text-center text-stone-400 text-sm py-10">
                {t("ensiklopedia.tanamanKosong")}
              </p>
            )}
          </div>
        )}

        {/* Tab: Racikan */}
        {tab === "racikan" && (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRacikan.map((item) => (
              <RacikanCard
                key={item.id}
                item={item}
                onClick={() => setSelectedRacikan(item)}
              />
            ))}
            {filteredRacikan.length === 0 && (
              <p className="col-span-full text-center text-stone-400 text-sm py-10">
                {t("ensiklopedia.racikanKosong")}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTanaman && (
        <TanamanModal item={selectedTanaman} onClose={() => setSelectedTanaman(null)} />
      )}
      {selectedRacikan && (
        <RacikanModal item={selectedRacikan} onClose={() => setSelectedRacikan(null)} />
      )}
    </div>
  );
}
