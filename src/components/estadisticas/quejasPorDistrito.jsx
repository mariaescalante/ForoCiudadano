import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { supabase } from "../../../public/supabase.js";

let { data: quejas_por_distrito, error } = await supabase
  .from('quejas_por_distrito')
  .select('*')

let todosLosDistritos = ['Bellavista - La Palmera', 'Casco Antiguo', 'Cerro - Amate', 'Este - Alcosa - Torreblanca', 'Los Remedios', 'Macarena', 'Nervión', 'Norte', 'San Pablo - Santa Justa', 'Sur', 'Triana'];

let distritos = [];
let total_quejas = [];

todosLosDistritos.forEach(distrito => {
  let queja = quejas_por_distrito.find(obj => obj.distrito === distrito);
  distritos.push(distrito);
  total_quejas.push(queja ? queja.total_quejas : 0);
});

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";

const QuejasPorDistrito = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    return localTheme ? localTheme : 'light';
  });

  const [fontSize, setFontSize] = useState(window.innerWidth > 768 ? 16 : 10);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth > 768 ? 16 : 10);
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
          labels: distritos,
          datasets: [
            {
              label: "Número de quejas",
              data: total_quejas,
              backgroundColor: "#14B8A6",
              borderColor: "#2A706B",
              borderWidth: 2,
              borderRadius: 2,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              grid: {
                color: isDarkMode ? '#ffffff' : '#262626',
              },
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: fontSize,
                },
              },
              title: {
                display: true,
                text: "Número de quejas",
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: fontSize,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxRotation: 90,
                minRotation: 90,
                color: isDarkMode ? '#F5F5F5' : '#262626',
                font: {
                  size: window.innerWidth > 1025 ? fontSize : fontSize - 5,
                },
                callback: function (value, index, values) {
                  let districtName = distritos[index];
                  return window.innerWidth > 1025 ? [districtName] : districtName.split('-');
                },

              },
            },
          },
        }}
      />
    </div>
  );
};
export default QuejasPorDistrito;