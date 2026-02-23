import { motion } from "framer-motion";
import { useRef } from "react";
import SearchBar from "../SearchBar/SearchBar"; // adjust path

export default function Header({
  alerts,
  search,
  setSearch,
  cities,
  setLocation,
  fetchWeather,
  fetchCities,
  setCities,
  darkMode,
  setDarkMode,
}) {
  const searchRef = useRef(null);

  return (
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LEFT: Logo + App Name + Alerts */}
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg"
            animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            S
          </motion.div>
          <motion.span
            className="font-black text-2xl hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            SkyCast
          </motion.span>
          {alerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full animate-bounce">
              {alerts.length} Alert{alerts.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* RIGHT: Search Bar */}
        <div
          className="ml-auto w-full max-w-md flex items-center gap-4"
          ref={searchRef}
        >
          <SearchBar
            search={search}
            setSearch={setSearch}
            cities={cities}
            setLocation={setLocation}
            fetchWeather={fetchWeather}
            fetchCities={fetchCities}
            ref={searchRef}
            setCities={setCities}
          />
          <div
            className="relative w-14 h-7 shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 cursor-pointer flex items-center"
            role="switch"
            aria-checked={darkMode}
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="pl-2 text-xs">☀️</span>
            <span className="ml-auto pr-2 text-xs">🌙</span>
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-slate-700 dark:bg-slate-200 transition-transform ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
