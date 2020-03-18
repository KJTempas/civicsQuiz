//JS for chart.js

let canvas = document.getElementById('civics_chart')
//console.log(canvas)
let ctx = canvas.getContext('2d');

//from stackOverflow - getting label on bar chart
var chartOptions = {
    animation: false,
    responsive : true,
    tooltipTemplate: "<%= value %>",
    tooltipFillColor: "rgba(0,0,0,0)",
    tooltipFontColor: "#444",
    tooltipEvents: [],
    tooltipCaretSize: 0,
    onAnimationComplete: function()
    {
        this.showTooltip(this.datasets[0].bars, true);
    }
};

//window.myBar = new Chart(ctx1).Bar(chartData, chartOptions);


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
   options: { //original
        scales: {
            yAxes: [{  
                //yLabel: number | string,
                ticks: {
                    max: 10,
                    beginAtZero: true,
                    stepSize: 1.0
                }
            }]
        }
    },

   /*options: { 
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
            }
        },*/

        scales: {
            yAxes: [{  
                //yLabel: number | string,
                ticks: {
                    max: 10,
                    beginAtZero: true,
                    stepSize: 1.0
                }
            }]
        }
   // }
    //}
    });

let chartColors = ['#003f5c', '#58508d', '#bd5090', '#ff6361', '#ffa600']

//call this function at end of submit button function
//function addResultsToChart(userName, totalScore) { //original
//function addResultsToChart(scores) { //scores are from the json server
    function chartResultsAndAverage(scores) {
        let grandTotal=0 //for average
        let numberOfStudents = scores.length 
    
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
    let averageScore = 'average score' //label for average bar in graph
    let average = grandTotal/numberOfStudents
    let avg=average.toFixed(2)
    averageScoreLabel.innerHTML = `Average score is  ${avg} .  ${scores.length} students have taken the quiz.`
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

