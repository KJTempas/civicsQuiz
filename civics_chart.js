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
//function addResultsToChart(userName, totalScore) { //original
//function addResultsToChart(scores) { //scores are from the json server
    function chartResultsAndAverage(scores) {
        let grandTotal=0 //for average
        console.log('scores that got to the chart fx', scores) //working
        let numberOfStudents = scores.length 
    
        console.log('number of Students = ', numberOfStudents) 
    for (let i=0; i<scores.length; i++) {
        let userName = scores[i].name
        let totalScore = scores[i].score

        grandTotal +=totalScore  //for determining average

        civicsResultsChart.data.labels.push(userName) //add userName to the label array
    civicsResultsChart.data.datasets[0].data.push(totalScore) //add totalScore to the data array

    let colorCount = civicsResultsChart.data.datasets[0].backgroundColor.length
    civicsResultsChart.data.datasets[0].backgroundColor.push(chartColors[colorCount % chartColors.length])

    civicsResultsChart.update()


    }
    let averageScore = 'average score'
    let average = grandTotal/numberOfStudents
    civicsResultsChart.data.labels.push(averageScore)
    civicsResultsChart.data.datasets[0].data.push(average)

    //add data to the label array, and data array
    //civicsResultsChart.data.labels.push(userName)//original
    //civicsResultsChart.data.datasets[0].data.push(totalScore) //original

    //add colors from chartColors array
    //let colorCount = civicsResultsChart.data.datasets[0].backgroundColor.length
    //civicsResultsChart.data.datasets[0].backgroundColor.push(chartColors[colorCount % chartColors.length])

    civicsResultsChart.update()

}

