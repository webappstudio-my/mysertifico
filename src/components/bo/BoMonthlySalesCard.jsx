// src/components/bo/BoMonthlySalesCard.jsx
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const BoMonthlySalesCard = ({ theme }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const isDarkMode = theme === 'dark';
        const chartOptions = {
            series: [{
                name: "Sales",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 120, 150, 130]
            }],
            chart: {
                height: 300,
                type: 'area',
                toolbar: {
                    show: false,
                },
                fontFamily: 'Inter, sans-serif',
                foreColor: isDarkMode ? '#94a3b8' : '#475569',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: ['#0d9488'],
            },
            xaxis: {
                type: 'category',
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: isDarkMode ? '#94a3b8' : '#475569',
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return "RM " + value;
                    },
                    style: {
                        colors: isDarkMode ? '#94a3b8' : '#475569',
                    }
                }
            },
            tooltip: {
                theme: isDarkMode ? 'dark' : 'light',
                x: {
                    format: 'MMM'
                },
                y: {
                    formatter: function (val) {
                        return "RM " + val;
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ['#2dd4bf'],
                    inverseColors: true,
                    opacityFrom: 0.7,
                    opacityTo: 0,
                    stops: [0, 100],
                }
            },
            grid: {
                borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                strokeDashArray: 4,
            }
        };

        if (chartRef.current) {
            chartRef.current.innerHTML = '';
            const chart = new ApexCharts(chartRef.current, chartOptions);
            chart.render();
        }
    }, [theme]);

    return (
        <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md md:col-span-2">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Monthly Sales Summary</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">RM 35,500 <span className="text-green-500 ml-2">▲ 15%</span></p>
                </div>
            </div>
            <div id="monthly-sales-chart" ref={chartRef}></div>
        </div>
    );
};

export default BoMonthlySalesCard;