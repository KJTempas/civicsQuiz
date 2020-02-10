//JS for chart.js

var canvas = document.getElementById('civics_chart')
var ctx = canvas.getContext('2d');

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
//see wk5 ppt slide 60 - live updates to chart

function addResultsToChart(name, totalScore) {
    //add data to the label array, and data array
    civicsResultsChart.data.labels.push(name)
    civicsResultsChart.data.datasets[0].data.push(totalScore)

    civicsResultsChart.update()

}

