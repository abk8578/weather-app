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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex">
        <div className="self-center backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6 lg:p-8">
          <h1 className="text-4xl lg:text-6xl font-black text-white drop-shadow-lg">
            {location.name}
          </h1>
          <p className="text-lg lg:text-xl text-white/90 font-medium drop-shadow-md">
            {location.region}
          </p>
          <div className="flex items-end gap-6 mt-4">
            <span className="text-7xl lg:text-9xl font-black text-white drop-shadow-2xl">
              {weather?.today.icon}
            </span>
            <span className="text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
              {weather?.today.temp}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
