//JS for chart.js

let canvas = document.getElementById('civics_chart')

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
    },

        scales: {
            yAxes: [{  
                ticks: {
                    max: 10,
                    beginAtZero: true,
                    stepSize: 1.0
                }
            }]
        }
    });

let chartColors = ['#003f5c', '#58508d', '#bd5090', '#ff6361', '#ffa600']


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

    
    civicsResultsChart.update()

}

