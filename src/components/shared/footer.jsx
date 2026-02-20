// Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-blue-200 dark:bg-slate-900 text-gray-700 dark:text-slate-300 py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
