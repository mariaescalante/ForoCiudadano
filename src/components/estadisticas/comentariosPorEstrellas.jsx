import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from
    "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { supabase } from "../../../public/supabase.js";



let { data: comentarios_por_estrellas, error } = await supabase
    .from('comentarios_por_estrellas')
    .select('*')

let estrellas = [];
let porcentaje_comentarios = [];

comentarios_por_estrellas.forEach(item => {
    estrellas.push(item.estrella);
    porcentaje_comentarios.push(item.porcentaje_comentarios);
});

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const comentaiosPorEstrellas = () => {
    const [theme, setTheme] = useState(() => {
        const localTheme = window.localStorage.getItem('theme');
        return localTheme ? localTheme : 'light';
    });
    const labelColor = theme === 'light' ? "#03362D" : "#ffffff";
    const [fontSize, setFontSize] = useState(window.innerWidth >= 768 ? 20 : 6);

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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'

        }}>
            <Doughnut
                data={{
                    labels: estrellas.map(e => `${e} estrellas`),
                    datasets: [
                        {
                            label: "Porcentaje",
                            data: porcentaje_comentarios,
                            backgroundColor: [
                                "#14B8A6",
                                "#0C7065",
                                "#B0FCD9",
                                "#033B32",
                                "#10B879",
                            ],
                            borderColor: "white",
                            borderWidth: 2,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: labelColor,
                                fontSize: fontSize
                            },
                        },
                    },
                }}

            />
        </div>
    );
};
export default comentaiosPorEstrellas;