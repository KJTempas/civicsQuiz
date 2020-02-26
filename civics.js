 
//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
let questions = document.querySelectorAll('.questions')  //select all w/ class questions
let nextUserButton = document.querySelector('#nextUser')
let averageButton = document.querySelector('#average')
let averageScore = document.querySelector('#averageScore')
let questionsUrl = "http://localhost:3000/questions"
let scoresUrl = "http://localhost:3000/scores"
//# for id; . for class

//localStorage.removeItem("Zion") //if you need to remove something or rt click and clear local storage

//note: to stop server-    Control+C 
//to start server - in terminal type this:  node_modules/.bin/json-server --watch server.json OR up arrow in terminal
fetch(questionsUrl) //go the the questionsUrl and fetch the questions //getting a 404 when server is on
    .then( resp => resp.json()) //convert object to JSON
    .then( questions => {
        questions.forEach(question => { //loop through all of the questions in server.json
            let item = document.createElement('li') //create a list item for each question
            let numberPlusQuestion = question.id + ' ' +  question.question
            console.log(numberPlusQuestion)
            item.innerHTML = numberPlusQuestion
            list.appendChild(item)  //adding the question to ul list in html 

            console.log('correct answer ', question.correctAnswer) //works
            console.log('wrong answers ', question.wrongAnswers)//works - get array 
            //need a break element here so radio button is on a new line

            //answers.forEach(answer =>{
               // let radioButton = document.createElement("INPUT");  //w3schools - create a radio button element
              //  radioButton.setAttribute("type", "radio"); 
           // })
            let radioButton = document.createElement("INPUT");  //w3schools - create a radio button element
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("name", 'quest' + question.id)
            radioButton.setAttribute("value", "question.correctAnswer")
            radioButton.setAttribute("class", "correctAnswer")
        
            radioButton.innerText = "question.correctAnswer" 
            item.append(radioButton) // need to link raio button to li (item)
           // <label for=" ">Answer goes here</label>  //need one of these for each answer
            //create a label for the radio button and set the innerHTML of the radio button to question.correctAnswer or wrong
            //need to randomize these 4 answers
            //Collections.shuffle(array of answers)
            //loop through answers - always 4
            let allAnswers = question.correctAnswer +',' + question.wrongAnswers
            console.log('all answers' , allAnswers)
            

            
        
        });

})



submitButton.addEventListener('click', function() {
    //when the user clicks the submit button
    let totalScore=0
    //get the student name
    let userName = studentNameInput.value
    // add validation that name >1character
    if(userName.length<1) {
        alert('Enter a user name')
        return
    }
    //what if 2 people have same name?
    //loop through local storage - if name already present, alert
    let arrayOfKeys = Object.keys(localStorage);   
    //use arrow notation
    //arrayOfkeys.forEach(key);{
        for(let i=0; i<arrayOfKeys.length; i++){
        if (userName === arrayOfKeys[i]){
            alert('This name is already in system. Please add your last name ') 
        }
    }

    //or look in json server - if already there, have user enter last name
    
    questions.forEach(function(question) {  // loop though a node list of questions
        wrongAnswerList=[]
        let correctAnswer = question.querySelector('.correctAnswer')  //find the correct answer for this question
        let questName = correctAnswer.getAttribute('name') 
        //get the user's answer -call the function below - tie it to the correct class
        userAnswer =getRadioValue(questName) 
    
        if(userAnswer ===correctAnswer.value) {  //if the two answers are the same, add one to the total
            totalScore++
        }else{ //otherwise, add that question# to the array
            wrongAnswerList.push(questName)
        }  //if the wrong answer list has any elements in it, alert the user
        if (wrongAnswerList.length>0){
            alert('You got these questions incorrect: ' +  wrongAnswerList)
            for(let x=0; x<wrongAnswerList.length; x++){ //loop through list and let user know correct answer
                alert('The correct answer to ' + wrongAnswerList[x] + ' is '  + correctAnswer.value)
            }
        } 
    })

    //show person's score after looping is complete
    indivScore.innerHTML = `You scored ${totalScore} out of ${questions.length}`
    //call function to update chart
    addResultsToChart(userName, totalScore)
    localStorage.setItem(userName, totalScore)
})

//below using json server
//npm install json-server
//node_modules/.bin/json-server --watch server.json   - to start server
//see server at http://localhost:3000
//Press control+c to stop server -remember to do this at end of work session!


document.querySelector('#submit').addEventListener('click', function() {
    
    // for example - you would get this from data the user entered 
    //let data = { name: 'Cat', score: 9}
    let data = {name: 'userName', score: 'totalScore'}

    fetch(scoresUrl, { 
        method: 'POST',   //post adds scores to json server
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data) //converting object into JSON using stringify
        })
        .then(resp => { 
            console.log(resp)
        })
})
//https://www.w3schools.com/js/js_json_intro.asp
//to convert JSON into an object (like my questions)
//var myObj = JSON.parse(myJSON);   //where myJSON = k/v pairs in an object - 

// Storing data:
//myObj = {name: "John", age: 31, city: "New York"};
//myJSON = JSON.stringify(myObj);
//localStorage.setItem("testJSON", myJSON);

// Retrieving data:
//text = localStorage.getItem("testJSON");
//obj = JSON.parse(text);
//document.getElementById("demo").innerHTML = obj.name;

    
nextUserButton.addEventListener('click', function() {
    //clear name input
    studentNameInput.value=''
    //clear result field
    indivScore.innerHTML= ""
    //call function to uncheck all radio buttons
    uncheck()  
})

averageButton.addEventListener('click', function() {
    //call function below
    average =findAverage()
    let avg=average.toFixed(2) //so only 2 digits past decimal
    //show results
    averageScore.innerHTML = `Average score is ${avg}`
    //graph average
    let totalScore = average
    addResultsToChart('average', totalScore) //need this to show only 2 digits past decimal

})

function getRadioValue(questionName) { 
    let ele = document.getElementsByName(questionName); 
      let userAnswer='';
    for(let i = 0; i < ele.length; i++) { //loop through radio button elements for each question
        //if the element is checked, then that element's value is the user Answer
        if(ele[i].checked) {  
            userAnswer = ele[i].value; 
        } 
    } 
    return userAnswer
} 
//original here
function uncheck() {//loop through and set all radio buttons to unchecked
   //w/ help from  https://forums.asp.net/t/1526762.aspx?Uncheck+Radio+button+list
   let correctEl = document.getElementsByClassName("correctAnswer")  //this makes a node list
    for (let x=0; x<correctEl.length; x++){ //loop through the node list
        if (correctEl[x].checked = true ){  //if element is checked, uncheck it
            correctEl[x].checked = false;
    }
}
   let wrongEl = document.getElementsByClassName("wrongAnswer")
   //loop through and set unchecked to true
   for(let t=0; t<wrongEl.length; t++) {
       if(wrongEl[t].checked=true ){
            wrongEl[t].checked = false;
   }
 }
}

//alternate version - more concise-not working
/*
function uncheck()
//select all elements with input type="radio"
//let radioButtons = document.getElementsByClassName("wrongAnswer", "correctAnswer") //does not work
   // let radioButtons = document.querySelectorAll('input[type="radio"]') //does not work
    let allButtons = document.getElementsByName("choice")
//input type=radio
    console.log('number of radioButtons is ',allButtons.length) 
    for (let x=0; x<radioButtons.length; x++) {
        radioButtons[x].checked=false;
    }

    
*/




function findAverage() {
    let arrayOfValues = Object.values(localStorage);  //stack overflow   
    let total = 0
    //loop through array and add to total
    for (let i=0; i<arrayOfValues.length; i++) {
        let int = Number(arrayOfValues[i])//convert from string to int
        total =total+ int  
    
    }
    let average = total/arrayOfValues.length
    console.log('average is ', average) 
    return average;
}




   