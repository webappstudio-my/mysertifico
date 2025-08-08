// src/components/bo/BoChartCard.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BoChartCard = () => {
    const chartState = {
        series: [{
            name: 'Users',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false },
                foreColor: '#475569', // Slate-600
                background: 'transparent',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: { text: 'Users' }
            },
            fill: { opacity: 1 },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " users"
                    }
                }
            },
            theme: { mode: 'light' },
            grid: { borderColor: '#e5e7eb' },
            colors: ['#0d9488']
        }
    };

    // Update chart theme based on the global dark mode state
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    chartState.options.theme.mode = currentTheme;
    chartState.options.chart.foreColor = currentTheme === 'dark' ? '#cbd5e1' : '#475569';
    chartState.options.grid.borderColor = currentTheme === 'dark' ? '#334155' : '#e5e7eb';
    chartState.options.tooltip = {
        theme: currentTheme,
        style: { fontSize: '12px' }
    };

    return (
        <div className="bg-bo-surface-light dark:bg-bo-surface-dark p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">New Users Registered</h3>
            <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
        </div>
    );
};

export default BoChartCard;