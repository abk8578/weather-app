import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { decodeWeather } from "../../utils/weatherCodes";
import AboutPage from "../aboutUs/aboutUs";
import Hero from "../hero/hero";
import Highlights from "../Highlights/Highlights";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import MapCard from "../MapCard/MapCard";
import Footer from "../shared/footer";
import Header from "../shared/header";
import Tabs from "../Tabs/Tabs";
import TodayWeather from "../TodayWeather/TodayWeather";
import WeatherAlerts from "../WeatherAlerts/WeatherAlerts";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";

/* ✅ UPDATED SKY / MOUNTAIN BACKGROUNDS ONLY */
const weatherBackgrounds = {
  clear:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80",

  cloudy:
    "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80",

  rainy:
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1920&q=80",

  snowy:
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1920&q=80",

  thunderstorm:
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80",

  foggy:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1920&q=80",

  default:
    "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920&q=80",
};

export default function WeatherApp() {
  const [activeTab, setActiveTab] = useState("today");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState({
    lat: 28.6139,
    lon: 77.209,
    name: "New Delhi",
    region: "Delhi, India",
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  /* 🔹 YOUR ORIGINAL BACKGROUND LOGIC (UNCHANGED) */
  const getBackgroundImage = () => {
    if (!weather?.today) return weatherBackgrounds.default;

    const code = weather.today.weatherCode;

    if (code === 0) return weatherBackgrounds.clear;
    if (code >= 1 && code <= 3) return weatherBackgrounds.cloudy;
    if (code >= 45 && code <= 48) return weatherBackgrounds.foggy;
    if (code >= 51 && code <= 67) return weatherBackgrounds.rainy;
    if (code >= 71 && code <= 77) return weatherBackgrounds.snowy;
    if (code >= 80 && code <= 82) return weatherBackgrounds.rainy;
    if (code >= 95) return weatherBackgrounds.thunderstorm;

    return weatherBackgrounds.default;
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(url).then((r) => r.json());

      const hourlyByDate = {};
      res.hourly.time.forEach((t, i) => {
        const d = new Date(t);
        const dateKey = d.toISOString().slice(0, 10);
        if (!hourlyByDate[dateKey]) hourlyByDate[dateKey] = [];
        hourlyByDate[dateKey].push({
          time: d.toLocaleTimeString([], { hour: "numeric" }),
          temp: Math.round(res.hourly.temperature_2m[i]),
          icon: decodeWeather(res.hourly.weather_code[i]).icon,
          cond: decodeWeather(res.hourly.weather_code[i]).desc,
          weatherCode: res.hourly.weather_code[i],
        });
      });

      const formatted = {
        today: {
          temp: Math.round(res.current.temperature_2m),
          desc: decodeWeather(res.current.weather_code).desc,
          humidity: `${res.current.relative_humidity_2m}%`,
          wind: `${res.current.wind_speed_10m} km/h`,
          pressure: `${res.current.surface_pressure} hPa`,
          high: Math.round(res.daily.temperature_2m_max[0]),
          low: Math.round(res.daily.temperature_2m_min[0]),
          icon: decodeWeather(res.current.weather_code).icon,
          weatherCode: res.current.weather_code,
        },
        hourly: res.hourly.time.slice(0, 12).map((t, i) => ({
          time: new Date(t).toLocaleTimeString([], { hour: "numeric" }),
          temp: Math.round(res.hourly.temperature_2m[i]),
          icon: decodeWeather(res.hourly.weather_code[i]).icon,
          cond: decodeWeather(res.hourly.weather_code[i]).desc,
          weatherCode: res.hourly.weather_code[i],
        })),
        weekly: res.daily.time.map((d, i) => ({
          day: new Date(d).toLocaleDateString("en-US", { weekday: "short" }),
          date: d,
          temp: Math.round(res.daily.temperature_2m_max[i]),
          icon: decodeWeather(res.daily.weather_code[i]).icon,
          cond: decodeWeather(res.daily.weather_code[i]).desc,
          weatherCode: res.daily.weather_code[i],
        })),
        hourlyByDate,
      };

      setWeather(formatted);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchCities = async (val) => {
    if (val.length < 2) return setCities([]);
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=5&format=json`,
    ).then((r) => r.json());
    setCities(res.results || []);
  };

  useEffect(() => {
    fetchWeather(location.lat, location.lon);
  }, [location]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-blue-600">Loading Weather...</p>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen relative flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={getBackgroundImage()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={getBackgroundImage()}
          alt="background"
          className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
        />
      </AnimatePresence>

      <div className="fixed inset-0 z-0 bg-black/25 pointer-events-none" />

      <Header
        alerts={alerts}
        search={search}
        setSearch={setSearch}
        cities={cities}
        setLocation={setLocation}
        fetchWeather={fetchWeather}
        fetchCities={fetchCities}
        setCities={setCities}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero
        location={location}
        weather={weather}
        currentTime={currentTime}
        getBackgroundImage={getBackgroundImage}
      />
      <WeatherAlerts alerts={alerts} setAlerts={setAlerts} />
      <div className=" bg-gradient-to-b from-transparent to-white/60 dark:to-slate-900/60" />

      <main className="w-full flex-1 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
            <div
              className={`space-y-8 ${
                activeTab === "today" ? "lg:col-span-8" : "lg:col-span-12"
              }`}
            >
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "today" && (
                <>
                  <TodayWeather
                    weather={weather}
                    location={location}
                    getBackgroundImage={getBackgroundImage}
                  />
                  <Highlights today={weather.today} />
                </>
              )}

              {activeTab === "hourly" && (
                <HourlyForecast hourly={weather.hourly} />
              )}

              {activeTab === "weekly" && (
                <WeeklyForecast
                  weekly={weather.weekly}
                  onDayClick={(item) => {
                    setSelectedDay(item);
                    setSelectedHours(weather.hourlyByDate?.[item.date] || null);
                  }}
                />
              )}

              {activeTab === "about" && <AboutPage />}
            </div>

            {activeTab === "today" && (
              <div className="lg:col-span-4">
                <MapCard location={location} weather={weather} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedHours && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedDay(null);
              setSelectedHours(null);
            }}
          >
            <motion.div
              className="max-w-6xl w-[95%] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xl"
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {selectedDay?.day} Hours
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedDay?.cond}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedDay?.date
                      ? new Date(selectedDay.date).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <button
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  onClick={() => {
                    setSelectedDay(null);
                    setSelectedHours(null);
                  }}
                >
                  Close
                </button>
              </div>
              {Array.isArray(selectedHours) && selectedHours.length > 0 ? (
                <HourlyForecast hourly={selectedHours} />
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  No hourly data for this day.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
