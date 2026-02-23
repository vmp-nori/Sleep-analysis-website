import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile sidebar toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleSidebar = () => {
        sidebar.classList.toggle('-translate-x-full');
    };

    if (mobileBtn) mobileBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });

    // Get tailwind config computed variables from custom style logic
    // Since we know the colors from the user request, we can set them staticly for charts
    // text: #eae9eb, background: #121114, primary: #6c46b2, secondary: #544a65, accent: #7d6d9a
    const colorText = '#eae9eb';
    const colorPrimary = '#6c46b2';
    const colorAccent = '#7d6d9a';

    // Common chart options for dark theme
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        color: colorText,
        plugins: {
            legend: {
                labels: { color: 'rgba(234, 233, 235, 0.7)' }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(234, 233, 235, 0.1)' },
                ticks: { color: 'rgba(234, 233, 235, 0.7)' }
            },
            y: {
                grid: { color: 'rgba(234, 233, 235, 0.1)' },
                ticks: { color: 'rgba(234, 233, 235, 0.7)' }
            }
        }
    };

    // 1. Physical Chart (Distance Travelled vs Sleep)
    const ctxPhysical = document.getElementById('physicalChart');
    if (ctxPhysical) {
        new Chart(ctxPhysical, {
            type: 'bar',
            data: {
                labels: ['< 6 hrs', '6 - 7 hrs', '7 - 8 hrs', '8 - 9 hrs', '> 9 hrs'],
                datasets: [{
                    label: 'Avg Distance Travelled (km)',
                    data: [15, 28, 45, 42, 20],
                    backgroundColor: [
                        'rgba(248, 113, 113, 0.6)', // red
                        'rgba(125, 109, 154, 0.6)', // accent
                        'rgba(74, 222, 128, 0.8)',  // green (optimal)
                        'rgba(74, 222, 128, 0.8)',  // green (optimal)
                        'rgba(108, 70, 178, 0.6)'   // primary
                    ],
                    borderColor: 'rgba(234, 233, 235, 0.2)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: { beginAtZero: true, ...commonOptions.scales.y }
                }
            }
        });
    }

    // 2. Academic Chart (Inverse U-Shape Productivity)
    const ctxAcademic = document.getElementById('academicChart');
    if (ctxAcademic) {
        new Chart(ctxAcademic, {
            type: 'line',
            data: {
                labels: ['4h', '5h', '6h', '7h', '8h', '9h', '10h+'],
                datasets: [{
                    label: 'Productivity Score (Relative)',
                    data: [30, 45, 65, 85, 95, 90, 60],
                    borderColor: colorPrimary,
                    backgroundColor: 'rgba(108, 70, 178, 0.2)', // primary transparent
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: colorText,
                    pointRadius: 5
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: { beginAtZero: true, ...commonOptions.scales.y, max: 100 }
                }
            }
        });
    }

    // 3. Mental Health Chart (Coffee vs Emotional Stability)
    const ctxMental = document.getElementById('mentalChart');
    if (ctxMental) {
        new Chart(ctxMental, {
            type: 'line',
            data: {
                labels: ['< 6h', '6 - 7h', '7 - 8h', '8 - 9h', '> 9h'],
                datasets: [
                    {
                        label: 'Emotional Stability',
                        data: [40, 70, 95, 90, 65],
                        borderColor: '#4ade80', // green
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'Avg Caffeine (Cups)',
                        data: [3.5, 2.5, 1.2, 1.5, 2.0],
                        borderColor: '#f87171', // red
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderWidth: 2,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Stability Index', color: colorText },
                        ...commonOptions.scales.y
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Cups of Caffeine', color: colorText },
                        grid: { drawOnChartArea: false },
                        ticks: { color: 'rgba(234, 233, 235, 0.7)' }
                    }
                }
            }
        });
    }

    // 4. Mortality Chart (U-Shape Risk)
    const ctxMortality = document.getElementById('mortalityChart');
    if (ctxMortality) {
        new Chart(ctxMortality, {
            type: 'bar',
            data: {
                labels: ['< 6h', '7 - 8h (Baseline)', '> 9h'],
                datasets: [{
                    label: 'Relative Mortality Risk',
                    data: [1.12, 1.00, 1.30],
                    backgroundColor: [
                        'rgba(248, 113, 113, 0.8)', // Red (+12%)
                        'rgba(74, 222, 128, 0.8)',  // Green (Baseline)
                        'rgba(125, 109, 154, 0.8)'  // Accent (+30%)
                    ],
                    borderColor: 'rgba(234, 233, 235, 0.2)',
                    borderWidth: 1,
                    borderRadius: 8
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0.8,
                        title: { display: true, text: 'Relative Risk multiplier', color: colorText },
                        ...commonOptions.scales.y
                    }
                }
            }
        });
    }
});
