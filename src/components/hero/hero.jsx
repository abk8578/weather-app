export default function Hero({
  location,
  weather,
  currentTime,
  getBackgroundImage,
}) {
  return (
    <div className="w-full relative h-[320px] sm:h-[380px] lg:h-[460px] xl:h-[520px] 2xl:h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex">
        <div className="self-center w-full flex justify-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 lg:p-8 text-center">
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
