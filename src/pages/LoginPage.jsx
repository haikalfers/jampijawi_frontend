import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { publicApi } from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.errorEmailPassword"));
      return;
    }

    setLoading(true);
    try {
      const res = await publicApi.post("/auth/login", { email, password });
      const { token, user } = res.data;
      login(token, user);
      navigate("/keluhan");
    } catch (err) {
      setError(err.response?.data?.message || t("auth.errorLoginGagal"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <span className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center">
            <Leaf size={22} className="text-white" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-stone-900">{t("auth.loginTitle")}</h1>
          <p className="mt-1 text-sm text-stone-500 text-center">
            {t("auth.loginDesc")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-stone-700">{t("auth.email")}</label>
            <div className="mt-1.5 flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 focus-within:border-emerald-600">
              <Mail size={16} className="text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">{t("auth.kataSandi")}</label>
            <div className="mt-1.5 flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-3 focus-within:border-emerald-600">
              <Lock size={16} className="text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.kataSandiPlaceholder")}
                className="flex-1 outline-none text-sm text-stone-700 placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-stone-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition"
          >
            {loading ? t("auth.memproses") : t("auth.tombolMasuk")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          {t("auth.belumPunyaAkun")}{" "}
          <Link to="/register" className="text-emerald-700 font-medium">
            {t("auth.daftarDisini")}
          </Link>
        </p>
      </div>
    </div>
  );
}