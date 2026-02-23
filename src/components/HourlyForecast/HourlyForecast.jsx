import { motion } from "framer-motion";

export default function HourlyForecast({ hourly }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {hourly.map((item, i) => {
        const isSevere = [63, 65, 80, 81, 82, 95, 96, 99].includes(
          item.weatherCode,
        );
        return (
          <motion.div
            key={i}
            className={`p-4 sm:p-5 rounded-2xl border hover:shadow-lg transition-all group ${
              isSevere
                ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-500/50"
                : "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border-slate-200 dark:border-slate-700"
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-3 block">
              {item.time}
            </span>
            <span className="text-4xl sm:text-5xl mb-3 block">{item.icon}</span>
            <span className="text-xl sm:text-2xl font-black mb-2 block text-slate-900 dark:text-slate-100">
              {item.temp}°
            </span>
            {isSevere && (
              <span className="text-xs text-red-600 dark:text-red-400 font-bold">
                ⚠️ Severe
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
