//JS for chart.js
//input elements are in the civics.js file - needed here too? maybe so because in a function? how to make global?
//let studentNameInput = document.querySelector('#name')
//let userName = studentNameInput.value

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

//call this function at end of submit button function
function addResultsToChart(name, totalScore) {
    //add data to the label array, and data array
    civicsResultsChart.data.labels.push(name)
    civicsResultsChart.data.datasets[0].data.push(totalScore)

    //add colors from chartColors array
    let colorCount = civicsResultsChart.data.datasets[0].backgroundColor.length
    civicsResultsChart.data.datasets[0].backgroundColor.push(chartColors[colorCount % chartColors.length])

    civicsResultsChart.update()

}

