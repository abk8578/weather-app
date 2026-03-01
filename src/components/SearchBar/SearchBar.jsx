import { forwardRef, useState } from "react";

const SearchBar = forwardRef(
  (
    {
      search,
      setSearch,
      cities,
      setLocation,
      fetchWeather,
      fetchCities,
      setCities,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative w-80" ref={ref}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            fetchCities(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search for a city..."
          className="w-full bg-slate-100 rounded-xl px-12 py-3 text-sm outline-none focus:bg-white border-2 border-transparent focus:border-blue-300 transition-all shadow-sm"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        {isOpen && cities.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-xl border border-slate-200 overflow-hidden z-[110] mt-2">
            {cities.map((city) => (
              <div
                key={`${city.latitude}-${city.longitude}`}
                className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 border-b border-slate-50 last:border-0 transition-colors"
                onClick={() => {
                  setLocation({
                    lat: city.latitude,
                    lon: city.longitude,
                    name: city.name,
                    region: `${city.admin1}, ${city.country}`,
                  });
                  setSearch(city.name);
                  fetchWeather(city.latitude, city.longitude);
                  setIsOpen(false);
                }}
              >
                <div className="font-bold text-slate-700">
                  {city.name}
                  <span className="text-slate-500 font-normal">
                    , {city.admin1}, {city.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default SearchBar;
