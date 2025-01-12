// Initial data
let LineChartSeriesData = [
    {
        name: "Solar Irradiance",
        data: [],
        color: "#1A56DB",
    }
];

const LineChartOptions = {
    yaxis: {
        show: false,
        labels: {
            formatter: function (value) {
                return value + ' W/m²'; // Assuming Solar Irradiance is in W/m²
            }
        }
    },
    chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Poppins, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: true,
        },
        animations: {
            enabled: false,
            easing: 'easein',
            speed: 800,
            dynamicAnimation: {
                speed: 350
            }
        }
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -26
        },
    },
    series: LineChartSeriesData,
    xaxis: {
        categories: [],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
};

const LineChart = new ApexCharts(document.getElementById("main-chart"), LineChartOptions);
LineChart.render();

// Function to fetch data and update the chart
async function fetchDataAndUpdateChart() {
    try {
        const response = await fetch('http://192.168.0.111'); // Replace with your API URL
        const data = await response.json();

        const time = data.time;
        const solarIrradiance = parseFloat(data.Solarirradiance);

        // Update the chart data
        LineChartSeriesData[0].data.push(solarIrradiance);
        LineChartOptions.xaxis.categories.push(time);

        // Limit the data to the last 7 entries
        if (LineChartSeriesData[0].data.length > 7) {
            LineChartSeriesData[0].data.shift();
            LineChartOptions.xaxis.categories.shift();
        }

        LineChart.updateSeries(LineChartSeriesData);
        LineChart.updateOptions(LineChartOptions);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data and update the chart every 3 seconds
setInterval(fetchDataAndUpdateChart, 2000);


// Initial data for the chart
const ColumnChartOptions = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
        {
            name: "Organic",
            color: "#1A56DB",
            data: [
                { x: "Mon", y: 231 },
                { x: "Tue", y: 122 },
                { x: "Wed", y: 63 },
                { x: "Thu", y: 421 },
                { x: "Fri", y: 122 },
                { x: "Sat", y: 323 },
                { x: "Sun", y: 111 },
            ],
        },
        {
            name: "Social media",
            color: "#FDBA8C",
            data: [
                { x: "Mon", y: 232 },
                { x: "Tue", y: 113 },
                { x: "Wed", y: 341 },
                { x: "Thu", y: 224 },
                { x: "Fri", y: 522 },
                { x: "Sat", y: 411 },
                { x: "Sun", y: 243 },
            ],
        },
    ],
    chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Poppins, sans-serif",
        toolbar: {
            show: true,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadius: 8,
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        style: {
            fontFamily: "Poppins, sans-serif",
        },
    },
    states: {
        hover: {
            filter: {
                type: "darken",
                value: 1,
            },
        },
    },
    stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -14
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    xaxis: {
        floating: false,
        labels: {
            show: true,
            style: {
                fontFamily: "Poppins, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    fill: {
        opacity: 1,
    },
};

// Check if the chart container exists and ApexCharts is loaded
if (document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
    const ColumnChart = new ApexCharts(document.getElementById("column-chart"), ColumnChartOptions);
    ColumnChart.render();

    // Function to update the chart with new data
    function updateColumnChart() {
        // Generate random data for demonstration
        const newOrganicData = Math.floor(Math.random() * 500);
        const newSocialMediaData = Math.floor(Math.random() * 500);

        // Update the series data
        ColumnChart.updateSeries([
            {
                name: "Organic",
                data: [
                    { x: "Mon", y: newOrganicData },
                    { x: "Tue", y: newOrganicData + 10 },
                    { x: "Wed", y: newOrganicData - 20 },
                    { x: "Thu", y: newOrganicData + 50 },
                    { x: "Fri", y: newOrganicData - 30 },
                    { x: "Sat", y: newOrganicData + 100 },
                    { x: "Sun", y: newOrganicData - 50 },
                ],
            },
            {
                name: "Social media",
                data: [
                    { x: "Mon", y: newSocialMediaData },
                    { x: "Tue", y: newSocialMediaData + 20 },
                    { x: "Wed", y: newSocialMediaData - 10 },
                    { x: "Thu", y: newSocialMediaData + 30 },
                    { x: "Fri", y: newSocialMediaData - 20 },
                    { x: "Sat", y: newSocialMediaData + 50 },
                    { x: "Sun", y: newSocialMediaData - 30 },
                ],
            },
        ]);
    }

    // Update the chart every 3 seconds
    setInterval(updateColumnChart, 1000);
}





const BarChartOptions = {
    series: [
        {
            name: "Income",
            color: "#31C48D",
            data: [1420, 1620, 1820, 1420, 1650], // Use numbers instead of strings
        },
        {
            name: "Expense",
            data: [788, 810, 866, 788, 1100], // Use numbers instead of strings
            color: "#F05252",
        }
    ],
    chart: {
        sparkline: {
            enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
            show: true,
        }
    },
    fill: {
        opacity: 1,
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: "100%",
            borderRadiusApplication: "end",
            borderRadius: 6,
            dataLabels: {
                position: "top",
            },
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value) {
            return "$" + value;
        }
    },
    xaxis: {
        labels: {
            show: true,
            style: {
                fontFamily: "Poppins, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            },
            formatter: function(value) {
                return "$" + value;
            }
        },
        categories: ["Jul", "Aug", "Sep", "Oct", "Nov"],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                fontFamily: "Poppins, sans-serif",
            }
        }
    },
    grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: -20
        },
    },
};

let isBarChartReady = false;

if (document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
    const BarChart = new ApexCharts(document.getElementById("bar-chart"), BarChartOptions);
    BarChart.render().then(() => {
        isBarChartReady = true; // Set the flag to true when the chart is ready
        // Start updating the chart every second
    });

}