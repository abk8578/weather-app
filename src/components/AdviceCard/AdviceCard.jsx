import { motion } from "framer-motion";

export default function AdviceCard({ today, variant = "default" }) {
  const code = today?.weatherCode;
  const temp = today?.temp ?? 0;

  const thunder = [95, 96, 99];
  const rain = [61, 63, 65, 80, 81, 82];
  const snow = [71, 73, 75, 77, 85, 86];
  const clear = [0, 1];
  const partly = [2];
  const overcast = [3];
  const fog = [45, 48];
  const drizzle = [51, 53, 55];

  let title = "Today's Note";
  let msg = "Have a great day!";
  let emoji = "🙂";

  if (thunder.includes(code)) {
    title = "Thunderstorms";
    msg = "Stay indoors when possible and avoid open areas.";
    emoji = "⛈️";
  } else if (rain.includes(code)) {
    title = "Rainy";
    msg = "Carry an umbrella and watch for slippery roads.";
    emoji = "🌧️";
  } else if (drizzle.includes(code)) {
    title = "Light Showers";
    msg = "A light umbrella or jacket will help.";
    emoji = "🌦️";
  } else if (snow.includes(code)) {
    title = "Snowy";
    msg = "Dress warmly and be careful on icy surfaces.";
    emoji = "❄️";
  } else if (fog.includes(code)) {
    title = "Foggy";
    msg = "Low visibility — drive slowly and use fog lights.";
    emoji = "🌫️";
  } else if (overcast.includes(code)) {
    title = "Overcast";
    msg = "Cloudy skies — a calm day for indoor tasks.";
    emoji = "☁️";
  } else if (partly.includes(code)) {
    title = "Partly Cloudy";
    msg = "Pleasant weather — a light layer is enough.";
    emoji = "⛅";
  } else if (clear.includes(code)) {
    title = "Clear Sky";
    msg = "Enjoy the sunshine and stay hydrated.";
    emoji = "☀️";
  }

  if (temp >= 35) {
    title = "Hot Day";
    msg = "Drink water, avoid midday sun, and wear sunscreen.";
    emoji = "🥵";
  } else if (temp <= 10) {
    title = "Cold Day";
    msg = "Wear warm layers and protect your hands and ears.";
    emoji = "🧣";
  }

  const base =
    variant === "hero"
      ? "rounded-2xl border border-white/30 dark:border-slate-700 bg-white/10 dark:bg-slate-800/20 text-white"
      : "rounded-3xl border bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700";

  return (
    <motion.div
      className={`${base} p-6 flex items-start gap-4 shadow`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-4xl">{emoji}</div>
      <div>
        <h4
          className={`text-lg font-black ${
            variant === "hero"
              ? "text-black"
              : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {title}
        </h4>
        <p
          className={`text-sm ${
            variant === "hero"
              ? "text-black/90"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {msg}
        </p>
      </div>
    </motion.div>
  );
}
