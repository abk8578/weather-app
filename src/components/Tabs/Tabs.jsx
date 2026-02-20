export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["today", "hourly", "weekly", "about"];

  return (
    <div className="w-full">
      <div className="inline-flex items-center gap-2 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
