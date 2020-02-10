 
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
    let name = studentNameInput.value
    //TODO = add validation that >1character

    //for each question - if answer=correct, then add 1 to total score
    console.log(questions)
    //loop through the questions
    questions.forEach(function(question) {  // loop though a node list of questions
        console.log(questions.length)// works - shows 2 questions
        let correctAnswer = question.querySelector('.correctAnswer')  //find the correct answer for this question
        console.log(question) //ok
        console.log(correctAnswer.value) //prints correct answer

        //get the user's answer
        userAnswer =getRadioValue() //calling the function below - should return userAnswer
        //let userAnswer = question.querySelector('quest1.checked')
        
        console.log(userAnswer) //print the user's answer to Q1 - doesn't print anything
        
        //below is not happening
        if(userAnswer ===correctAnswer) {  //if the two answers are the same, add one to the total
            totalScore++
        }
    })
    //call function to update chart
    addResultsToChart(name, totalScore)
    //clear input
    studentNameInput.value=''


})
    
//show person's score after looping is complete
indivScore.innerHTML = totalScore
//need to clear answers, store this person's score


//this is not working
function getRadioValue() { 
    var ele = document.getElementsByName('quest1'); 
      let userAnswer='';
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            userAnswer = ele[i].value; 
            console.log(userAnswer) //nothing prints
        }
    } 
    return userAnswer
} 

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

  //from geeksfor geeks
  /*function display() {  
    var checkRadio = document.querySelector( 
        'input[name="GFG"]:checked'); 
      
    if(checkRadio != null) { 
        document.getElementById("disp").innerHTML 
            = checkRadio.value 
            + " radio button checked"; 
    } 
    else { 
        document.getElementById("disp").innerHTML 
            = "No one selected"; 
    } 
} */
  //from geeksfor geeks
  /*function getRadioValue() {  
    var checkRadio = document.querySelector( 
        'input[name="quest1"]:checked'); 
      
    if(checkRadio != null) { 
        let userAnswer= checkRadio.value ; 
    } 
    return userAnswer;          //error - useranswer is not defined
} */

