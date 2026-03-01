import { motion } from "framer-motion";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["today", "hourly", "weekly", "about"];

  return (
    <div className="w-full">
      <div className="relative grid grid-flow-col auto-cols-fr gap-2 p-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            className={`relative w-full text-center px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? "text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {activeTab === tab && (
              <>
                <motion.span
                  layoutId="tabPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                  transition={{ type: "spring", stiffness: 650, damping: 28 }}
                />
                <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <motion.span
                    className="absolute top-0 left-[-40%] h-full w-1/3 bg-white/25 blur-md"
                    animate={{ x: ["-40%", "140%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                  />
                </span>
              </>
            )}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
