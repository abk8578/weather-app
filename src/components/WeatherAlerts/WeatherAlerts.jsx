export default function WeatherAlerts({ alerts, dismissAlert }) {
  const getAlertStyles = (type, severity) => {
    if (type === "danger" || severity === "extreme") {
      return {
        bg: "bg-gradient-to-r from-red-500 to-red-600",
        border: "border-red-700",
        text: "text-white",
        iconBg: "bg-red-700",
      };
    } else if (type === "warning" || severity === "high") {
      return {
        bg: "bg-gradient-to-r from-orange-500 to-orange-600",
        border: "border-orange-700",
        text: "text-white",
        iconBg: "bg-orange-700",
      };
    } else {
      return {
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        border: "border-blue-700",
        text: "text-white",
        iconBg: "bg-blue-700",
      };
    }
  };

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="sticky top-20 z-[200] space-y-3 p-4 max-w-[1200px] mx-auto">
      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.type, alert.severity);
        return (
          <div
            key={alert.id}
            className={`${styles.bg} ${styles.text} rounded-2xl p-5 shadow-2xl border-2 ${styles.border} animate-pulse`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`${styles.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}
              >
                {alert.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg mb-2">{alert.title}</h3>
                <p className="text-sm opacity-95 leading-relaxed">
                  {alert.message}
                </p>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className={`${styles.iconBg} hover:opacity-80 w-8 h-8 rounded-lg flex items-center justify-center transition-opacity flex-shrink-0`}
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
