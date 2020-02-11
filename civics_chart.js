//JS for chart.js

let canvas = document.getElementById('civics_chart')
let ctx = canvas.getContext('2d');

//create chart object
let civicsResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [
            {
            data: [],
            backgroundColor: []
        }
    ],
        labels: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let chartColors = ['#003f5c', '#58508d', '#bd5090', '#ff6361', '#ffa600']


function addResultsToChart(name, totalScore) {
    //add data to the label array, and data array
    civicsResultsChart.data.labels.push(name)
    civicsResultsChart.data.datasets[0].data.push(totalScore)

    //add colors from chartColors array
    let colorCount = civicsResultsChart.data.datasets[0].backgroundColor.length
    civicsResultsChart.data.datasets[0].backgroundColor.push(chartColors % chartColors.length)

    civicsResultsChart.update()

}

