 

//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
let questions = document.querySelectorAll('.questions')  //select all w/ class questions
let nextUserButton = document.querySelector('#nextUser')
//# for id; . for class


submitButton.addEventListener('click', function() {
    //when the user clicks the submit button
    let totalScore=0
    //get the student name
    let userName = studentNameInput.value
    console.log('User name = ', userName)  
    // add validation that name >1character
    if(userName.length<1) {
        alert('Enter a user name')
    }

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
    localStorage.setItem('name', userName); //- shows
    localStorage.setItem('score', totalScore);
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
      isOneChecked()
    for(i = 0; i < ele.length; i++) { //loop through radio button elements for each question
        //if the element is checked, then that element's value is the user Answer
        if(ele[i].checked) {  
            userAnswer = ele[i].value; 
        } 
    } 
    return userAnswer
} 

 //based on  w3schools- this fx is working
function uncheck() {//loop through and set all radio buttons to unchecked
   //w/ help from  https://forums.asp.net/t/1526762.aspx?Uncheck+Radio+button+list
   let correctEl = document.getElementsByClassName("correctAnswer")  //this makes a node list
   //console.log('number of correct elements' , correctEl.length)  //printing 3 = good
    for (let x=0; x<correctEl.length; x++){ //loop through the node list
        if (correctEl[x].checked = true ){  //if element is checked, uncheck it
            correctEl[x].checked = false;
    }
}
   let wrongEl = document.getElementsByClassName("wrongAnswer")
   //console.log('number of wrongAnswerButtons', wrongEl.length)  //works
   //loop through and set unchecked to true
   for(let t=0; t<wrongEl.length; t++) {
       if(wrongEl[t].checked=true ){
            wrongEl[t].checked = false;
   }
 }
}
   //this function is not working yet 
function isOneChecked() { //function to make sure user selected one radio button for each question
    //loop through all questions
    questions.forEach(function(question) {
    // All <input> tags...
    var radios = document.getElementsByTagName('input');
  
    for (var i=0; i<radios.length; i++) { //looping through input elements in each question
      // If you have more than one radio group, also check the name attribute
      // for the one you want as in && chx[i].name == 'choose'
      // Return true from the function on first match of a checked item
      if (radios[i].type == 'radio' && radios[i].checked) {
        return true;
      } 
    }
    // End of the loop, return false
    return false;
    //maybe do an alert message??
  })
}

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
    


/*
        https://stackoverflow.com/questions/13060313/checking-if-at-least-one-radio-button-has-been-selected-javascript
        function check(){
            var radios = document.getElementsByName("choice");
       
            for (var i = 0, len = radios.length; i < len; i++) {
                 if (radios[i].checked) {
                     return true;
                 }
            }
       
            return false;
        }*/

        
    