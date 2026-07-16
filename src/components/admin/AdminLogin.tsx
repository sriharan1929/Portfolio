import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import { navigate } from "../../App";
import { Button } from "../ui/Button";

export const AdminLogin = () => {
  const { isAdmin, isDbConfigured } = usePortfolioData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin panel
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isDbConfigured) {
      setErrorMsg("Database connection is not configured in .env. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/admin");
    } catch (err) {
      const error = err as Error;
      console.error("Login error:", error);
      setErrorMsg(error.message || "Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffdf9] via-[#fffdf9] to-[#fdf0e0] px-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(237,160,80,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(194,97,26,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[460px] bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[32px] shadow-[0_8px_32px_rgba(194,97,26,0.05)] relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent-light border border-accent-border flex items-center justify-center text-accent text-xl mb-4 font-bold">
            🔑
          </div>
          <h1 className="font-cormorant text-3xl font-bold text-text-dark text-center">
            Admin Authentication
          </h1>
          <p className="text-[13px] text-text-muted mt-2 font-lora text-center">
            Log in to manage your portfolio database
          </p>
        </div>

        {!isDbConfigured && (
          <div className="p-4 mb-6 rounded-2xl bg-amber-50 border border-amber-200 text-[12px] leading-relaxed text-amber-800 font-lora">
            ⚠️ <strong>Notice:</strong> Database is not configured. Set up your Supabase project credentials in <code>.env</code> to enable login.
          </div>
        )}

        {errorMsg && (
          <div className="p-4 mb-6 rounded-2xl bg-red-50 border border-red-200 text-[13px] leading-relaxed text-red-700 font-lora">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-light font-dm-mono">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="admin@example.com"
              className="w-full px-5 py-3 rounded-xl bg-white/80 border border-[#f0ddc8] focus:border-[#e89050] focus:ring-1 focus:ring-[#e89050] outline-none text-text-dark text-sm transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-light font-dm-mono">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl bg-white/80 border border-[#f0ddc8] focus:border-[#e89050] focus:ring-1 focus:ring-[#e89050] outline-none text-text-dark text-sm transition-all duration-200"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-[2px] border-white/30 border-t-white animate-spin" />
                Logging in...
              </>
            ) : (
              "Authenticate"
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#f0ddc8]/60 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="text-[12px] font-semibold text-text-light hover:text-accent font-dm-mono flex items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none"
          >
            ← Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
