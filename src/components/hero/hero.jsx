export default function Hero({
  location,
  weather,
  currentTime,
  getBackgroundImage,
}) {
  return (
    <div className="w-full relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[520px] 2xl:h-[600px] overflow-hidden">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 h-full flex">
        <div className="self-center w-full flex justify-center">
          <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl backdrop-blur-md bg-white/5 dark:bg-slate-800/5 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl p-6 lg:p-8 text-center">
            <div className="text-white/95 font-black text-2xl lg:text-3xl flex items-center justify-center gap-2">
              <span>📍</span>
              <span>{location.name}</span>
            </div>
            <p className="text-white/90">
              {new Date(currentTime).toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex items-end justify-center gap-6 mt-4">
              <span className="text-7xl lg:text-9xl font-black text-white drop-shadow-2xl">
                {weather?.today.icon}
              </span>
              <span className="text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                {weather?.today.temp}°
              </span>
            </div>
            <p className="mt-2 text-white/90 text-lg font-semibold">
              {weather?.today?.desc}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-4 text-white/90">
              <div>
                H: {weather?.today?.high}° • L: {weather?.today?.low}°
              </div>
              <div>Humidity: {weather?.today?.humidity}</div>
              <div>Feels: {weather?.today?.temp}°</div>
              <div>Wind: {weather?.today?.wind}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
