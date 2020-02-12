 
//let totalScore=0
//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
//let selectedAnswer=document.querySelector('.answer') //all the answers for each question have class=answer
//let correctAnswer = document.querySelector('.correctAnswer')  //only the correct answer has this id
let questions = document.querySelectorAll('.questions')  //select all w/ class questions
let nextUserButton = document.querySelector('#nextUser')
//# for id; . for class



submitButton.addEventListener('click', function() {
    //when the user clicks the submit button
    let totalScore=0
    //get the student name
    let userName = studentNameInput.value
    console.log('User name = ', userName)  
    //TODO = add validation that >1character
    if(userName.length<1) {
        alert('Enter a user name')
    }

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
    
    //show person's score after looping is complete
    indivScore.innerHTML = `You scored ${totalScore} out of ${questions.length}`
    //call function to update chart
    addResultsToChart(userName, totalScore)
    localStorage.setItem('name', txtUsername.value); //- shows
    localStorage.setItem('score', txtScore.value);
    //localStorage.setItem(txtUserName.value, txtScore.value)
    //need to store this person's score? -see local storage info below line 76

})
    
nextUserButton.addEventListener('click', function() {
    //clear name input
    studentNameInput.value=''
    //clear result field
    indivScore.innerHTML= ""
    //call function to uncheck all radio buttons
    uncheck()  
    

})


function getRadioValue(questionName) { 
    var ele = document.getElementsByName(questionName); 
      let userAnswer='';

      //validation- make sure all questions have a radio button selected as an answer

    for(i = 0; i < ele.length; i++) { //loop through radio button elements for each question
        //if the element is checked, then that element's value is the user Answer
        if(ele[i].checked) {  
            userAnswer = ele[i].value; 
        } 
    } 
    return userAnswer
} 

 //based on  w3schools
function uncheck() {//loop through and set all radio buttons to unchecked
    //below is not working
   let correctEl = document.getElementsByClassName("correctAnswer")  //this makes a node list
   console.log('number of correct elements' , correctEl.length)  //printing 3 = good
    for (let x=0; x<correctEl.length; x++){
   // correctEl.forEach(function(button){  //error - correctEl.forEach is not a function at uncheck
        correctEl[x].unchecked = true;  //uncheck each of the buttons
    }

   let wrongEl = document.getElementsByClassName("wrongAnswer")
   console.log('number of wrongAnswerButtons', wrongEl.length)  //giving correct answer of 9
   //loop through and set unchecked to true
   for(let t=0; t<wrongEl.length; t++) {
        wrongEl[t].unchecked = true;
   }
 }

   //try variation on getRadioValue-not working
   /*var ele = document.getElementsByName(questionName);
   console.log('element', ele)
   console.log('questionName', questionName)
   //loop through the .......
       for(x=0; x<ele.length; x++) {
           ele[i].unchecked=true;  //not working

       }
   }*/


   

//document.getElementsByClassName("wrongAnswer").checked= false;
//local storage can be seen under Applications in the DevTools
//from Duckett book p422
    if (window.localStorage) {  //if the browser supports local storage
        let txtUsername = document.getElementById('name') //getting form elements
        let txtScore = document.getElementById('yourScore')  

        txtUsername.value = localStorage.getItem('name')  //elements populated by local Storage data
        txtScore.value = localStorage.getItem('yourScore')

        txtUsername.addEventListener('input', function() {  //save data
            localStorage.setItem('name', txtUsername.value);
        }, false);
        txtScore.addEventListener('input', function() {
            localStorage.setItem('score', txtScore.value);
        }, false);
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
  //from w3schools
  //function uncheck() {
    //document.getElementById("red").checked = false;
  //}

  