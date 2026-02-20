import { motion } from "framer-motion";

export default function WeeklyForecast({ weekly, onDayClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {weekly.map((item, i) => {
        const isSevere = [63, 65, 80, 81, 82, 95, 96, 99].includes(
          item.weatherCode,
        );
        return (
          <motion.button
            key={i}
            className={`w-full p-6 xl:p-7 rounded-2xl border hover:shadow-lg transition-all flex items-center justify-between group ${
              isSevere
                ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-500/50"
                : "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border-slate-200 dark:border-slate-700"
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => onDayClick && onDayClick(item)}
          >
            <div className="flex items-center gap-4">
              <div className="w-24">
                <p className="font-black text-lg text-slate-900 dark:text-slate-100">
                  {item.day}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(item.date).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="text-4xl">{item.icon}</span>
              <div className="hidden xl:block">
                <p className="font-bold text-sm text-slate-600 dark:text-slate-300">
                  {item.cond}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                {item.temp}°
              </span>
              {isSevere && (
                <span className="text-xs text-red-600 dark:text-red-400 font-bold">
                  ⚠️
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
