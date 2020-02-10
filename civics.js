 
let totalScore=0
//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
//let selectedAnswer=document.querySelector('.answer') //all the answers for each question have class=answer
//let correctAnswer = document.querySelector('.correctAnswer')  //only the correct answer has this id
let questions = document.querySelectorAll('.questions')  //select all w/ class questions
//# for id; . for class



submitButton.addEventListener('click', function() {
    //when the user clicks the submit button
    //get the student name
    let userName = studentNameInput.value
    console.log(name)
    //TODO = add validation that >1character

    console.log(questions)
    //loop through the questions
    questions.forEach(function(question) {  // loop though a node list of questions
        console.log(questions.length)// works - shows 2 questions
        let correctAnswer = question.querySelector('.correctAnswer')  //find the correct answer for this question
        console.log(question) //ok
        console.log('correct answer ', correctAnswer.value) //prints correct answer

        let questName = correctAnswer.getAttribute('name')
        //get the user's answer -call the function below - tie it to the correct class
        userAnswer =getRadioValue(questName) 
    
        console.log('user answer ' , userAnswer) //print the user's answer to Q1 - but not for Q2
        
        if(userAnswer ===correctAnswer.value) {  //if the two answers are the same, add one to the total
            totalScore++
            console.log('total score is ', totalScore)
        }else {
            console.log('wrong, answer is ' , correctAnswer)
        }
    })
    //call function to update chart
    addResultsToChart(userName, totalScore)
    //clear input
    studentNameInput.value=''
    //need to clear answers, store this person's score

//show person's score after looping is complete
indivScore.innerHTML = totalScore
})
    

function getRadioValue(questionName) { 
    var ele = document.getElementsByName(questionName); 
    //var ele = document.gert
      let userAnswer='';
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            userAnswer = ele[i].value; 
        }
    } 
    return userAnswer
} 
/*
//from Duckett book p422
    if (window.localStorage) {  //if the browser supports local storage
        let txtUsername = document.getElementById('name') //getting form elements
        let txtScore = document.getElementById('yourScore')  

        txtUsername.value = localStorage.getItem('name')  //elements populated by local Storage data
        txtScore.value = localStorage.getItem('yourScore')

        txtUsername.addEventListener('input', function() {  //save data
            localStorage.setItem('name', txtUsername.value);
        }, false);
        textScore.addEventListener('input', function() {
            localStorage.setItem('score', txtScore.value);
        }, false);
        }
    
    */


//from w3schools
//function uncheck() {
 //   document.getElementById("red").checked = false;
 // }
 /*function displayRadioValue() { 
    var ele = document.getElementsByName('gender'); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        document.getElementById("result").innerHTML
                = "Gender: "+ele[i].value; 
    } 
} */

//w3schools
//function check() {
//    document.getElementById("red").checked = true;
  //}

  