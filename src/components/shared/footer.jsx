// Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-6 text-center text-slate-700 dark:text-slate-300">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
