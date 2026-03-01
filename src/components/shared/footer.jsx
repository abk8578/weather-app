const Footer = () => {
  return (
    <footer className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-t border-white/20 sticky bottom-0 z-[100]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-6 text-center text-black">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
