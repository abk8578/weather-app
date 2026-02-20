import { motion } from "framer-motion";

export default function TodayWeather({
  weather,
  location,
  getBackgroundImage,
}) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('${getBackgroundImage()}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-slate-100">
          {location.name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {location.region}
        </p>

        <div className="flex items-baseline gap-4 mt-6">
          <span className="text-9xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            {weather?.today?.temp}°
          </span>
          <div className="text-slate-600 dark:text-slate-300">
            <p className="text-2xl font-bold">
              Feels like {weather?.today?.temp}°
            </p>
            <p className="text-lg">
              High {weather?.today?.high}° • Low {weather?.today?.low}°
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Humidity
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">
              {weather?.today?.humidity}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Wind
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">
              {weather?.today?.wind}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Pressure
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">
              {weather?.today?.pressure}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
