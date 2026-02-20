import MapView from "../map/mapView";

export default function MapCard({ location, weather }) {
  const getBackgroundImage = () => {
    return "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1920&q=80";
  };

  return (
    <div className="lg:col-span-4 mt-14 lg:sticky lg:top-28 self-start">
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl relative">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url('${getBackgroundImage()}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[760px] z-10">
          <MapView lat={location.lat} lon={location.lon} weather={weather} />
        </div>
      </div>
    </div>
  );
}
