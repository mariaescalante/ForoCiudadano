import { useEffect, useState } from "react";

function cambiarTema() {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme ? localTheme : 'light';
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    window.location.reload();
  };

  return (
    <div>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <i className={theme === 'dark' ? "fas fa-sun" : "fas fa-moon"} />
        <input type="checkbox" value="" className="sr-only peer" checked={theme === 'dark'} onChange={handleChangeTheme} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-tela-500 ml-2"></div>
      </label>
    </div>
  );


}

export default cambiarTema;