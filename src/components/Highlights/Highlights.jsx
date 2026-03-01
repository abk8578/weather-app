export default function Highlights({ today }) {
  const highlights = [
    {
      label: "Humidity",
      val: today.humidity,
      icon: "💧",
      desc: "Moderate",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Wind Speed",
      val: today.wind,
      icon: "🌬️",
      desc: "Light breeze",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Pressure",
      val: today.pressure,
      icon: "⏲️",
      desc: "Normal",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Feels Like",
      val: `${today.temp}°`,
      icon: "🌡️",
      desc: "Comfortable",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-black mb-6 mt-4">Today's Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${h.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{h.icon}</span>
              </div>
              <p className="text-xs uppercase font-black text-slate-400 mb-1">
                {h.label}
              </p>
              <p className="text-2xl font-black mb-1">{h.val}</p>
              <p className="text-xs text-slate-500">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
