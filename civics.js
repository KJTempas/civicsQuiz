 

//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
let questions = document.querySelectorAll('.questions')  //select all w/ class questions
let nextUserButton = document.querySelector('#nextUser')
//# for id; . for class

localStorage.removeItem("alan") //if you need to remove something

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
    localStorage.setItem(userName, totalScore)
    findAverage()


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
      //isOneChecked()
      //validate()
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
//function isOneChecked() { //function to make sure user selected one radio button for each question
 // Delegate submit action
 /*
 function validate(){
    if (checkRadio("question1") && checkRadio("question2") && checkRadio("question3")){
     return true;
    }else{
    alert("Please answer all Questions!");
     return false;
    }
    }
    function checkRadio(name){
     var radio = document.getElementsByTagName('input');  //error -cannot read property 'question 1' of undefined
    for (var option in radio){
    if(radio[option].checked){
     return true;
    }
    }
    return false;
    }

*/

function findAverage() {
    let arrayOfValues = Object.values(localStorage);  //stack overflow   
    console.log(arrayOfValues) //works - prints all values in " "
    console.log('length of array', arrayOfValues.length)  //good
    let total = 0
    //loop through array and add to total
    for (let i=0; i<arrayOfValues.length; i++) {
        //console.log(arrayOfValues[i])
        total =total+ arrayOfValues[i]  //concatenating, not adding
        //console.log(total)
    }
    let average = total/arrayOfValues.length
    console.log(average)
}


//average scores
//get number of items in local storage
//sum values
//divide     values/number of items = average
//graph average?

/*
https://stackoverflow.com/questions/5410745/how-can-i-get-a-list-of-the-items-stored-in-html-5-local-storage-from-javascript
localStorage.setItem('test', 'testing 1');
localStorage.setItem('test2', 'testing 2');
localStorage.setItem('test3', 'testing 3');

for(var i in localStorage)
{
    console.log(localStorage[i]);
}

//test for firefox 3.6 see if it works
//with this way of iterating it
for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    console.log(key + " => " + value);
}
This will output:

testing 3
testing 2
testing 1

test3 => testing 3
test2 => testing 2
test => testing 1
*/

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

        
       /* 
       from w3schools
       for saving data to local storage
       localStorage.setItem("key", "value");

        Syntax for READING data from localStorage:
        var lastname = localStorage.getItem("key");

        Syntax for REMOVING data from localStorage:
        localStorage.removeItem("key");*/