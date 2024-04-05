import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { supabase } from "../../../public/supabase.js";

let { data: media_valoraciones_por_usuario, error } = await supabase
  .from('media_valoraciones_por_usuario')
  .select('*')
  .order("media_valoraciones", { ascending: false })
  .range(0, 4);

let usuarios = [];
let valoraciones = [];

media_valoraciones_por_usuario.forEach(item => {
  usuarios.push(item.nombre_usuario + ' ' + item.apellidos_usuario);
  valoraciones.push(item.media_valoraciones);
});

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";

const usuariosMejorValorados = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme ? localTheme : 'light';
  });

  const [fontSize, setFontSize] = useState(window.innerWidth >= 768 ? 16 : 6);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth >= 768 ? 16 : 6);
    }
    setTheme(window.localStorage.getItem('theme'));

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  let isDarkMode = theme === 'dark';


  return (
    <div className="lg:mx-56 mx-5 h-auto">
      <Bar
        data={{
          labels: usuarios,
          datasets: [
            {
              label: "Valoración media",
              data: valoraciones,
              backgroundColor: "#14B8A6",
              borderColor: "#2A706B",
              borderWidth: 2,
              borderRadius: 2,
            },
          ],
        }}
        options={{
          indexAxis: 'y',
          scales: {
            x: {
              max:5,
              title: {
                display: true,
                text: "Valoración media",
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: fontSize,
                },
              },
              grid: {
                display: false,
              },
              ticks: {
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: fontSize
                },
              },
            },
            y: {
              grid: {
                color: isDarkMode ? '#ffffff' : '#262626',
              },
              beginAtZero: true,
              ticks: {
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: fontSize,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
export default usuariosMejorValorados;