//JS for chart.js

let canvas = document.getElementById('civics_chart')
//console.log(canvas)
let ctx = canvas.getContext('2d');

//create chart object
let civicsResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [
            {
            label: 'Score out of 10',
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
                    max: 10,
                    beginAtZero: true,
                    stepSize: 1.0
                }
            }]
        }
    }
});

let chartColors = ['#003f5c', '#58508d', '#bd5090', '#ff6361', '#ffa600']

//call this function at end of submit button function
function addResultsToChart(userName, totalScore) {
    //add data to the label array, and data array
    civicsResultsChart.data.labels.push(userName)
    civicsResultsChart.data.datasets[0].data.push(totalScore)

    //add colors from chartColors array
    let colorCount = civicsResultsChart.data.datasets[0].backgroundColor.length
    civicsResultsChart.data.datasets[0].backgroundColor.push(chartColors[colorCount % chartColors.length])

    civicsResultsChart.update()

}

