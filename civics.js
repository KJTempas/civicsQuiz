 
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
//to start server - in terminal type this:  node_modules/.bin/json-server --watch server.json        OR up arrow in terminal
//to view server- http://localhost:3000/questions or http://localhost:3000/answers
fetch(questionsUrl) //go the the questionsUrl and fetch the questions //getting a 404 when server is on
    .then( resp => resp.json()) //convert object to JSON
    .then( questions => {
                                //code 304 in terminal means not modified - question file is not modified
            let questionCounter = 1;
            
            let questionContainer = document.querySelector('#question-container')
            questions.forEach(question => { //loop through all of the questions in server.json
            
                let item=document.createElement('div')
                //each question will go in its own div
                item.classList.add('questions')

                //inside each div the question#  will be a header4 element
                let header = document.createElement('h4')
                header.innerHTML= `Question ${questionCounter}`
                questionCounter++  

                item.appendChild(header) //add the header to the div element

                let questionText= document.createElement('p')
                questionText.innerHTML = question.question
                item.appendChild(questionText) //add the question to the div
                
                questionContainer.appendChild(item)
            

            let allAnswerElements = [] //array to hold all answers
                    //call buildAnswerElement function once for each answer, and add these to the array
            let correct = buildAnswerElement(question.correctAnswer, question.id, true) // is correct answer
            allAnswerElements.push(correct) //add correct to the array

            question.wrongAnswers.forEach (answer =>{ //loop through the wrong answers, and add them to the array
                wrong = buildAnswerElement(answer, question.id, false)
                allAnswerElements.push(wrong)
            })
            
            allAnswerElements = shuffle(allAnswerElements) //calls function below
    
            allAnswerElements.forEach( function(el) {
                //let eachAnswer = document.createElement('p')
                //eachAnswer.innerHTML = 
                item.appendChild(el) //add all of the answers to the div(item)
            })
        });
})

function shuffle(arrayOfElements) {
  // let shuffled = [arrayOfElements[1],  //this is claras example to get data to show
//arrayOfElements[3], arrayOfElements[0], arrayOfElements[2]]
//return shuffled

//todo improve this function
//to shuffle - remove an element at random; insert into new array at random position

//from w3resource and stackoverflow
    var currentIndex = arrayOfElements.length, tempValue, randomIndex;
// While there are elements in the array
    while (0!==currentIndex) {
// Pick a random index
        randomIndex = Math.floor(Math.random() * currentIndex);
// Decrease currentIndex by 1
        currentIndex--;
// And swap it w/ current element
        tempValue = arrayOfElements[currentIndex];
        arrayOfElements[currentIndex] = arrayOfElements[randomIndex];
        arrayOfElements[randomIndex] = tempValue;
    }
    return arrayOfElements;
}



/** generic method to make one answer radio button  */
function buildAnswerElement(answerText, questionId, isCorrectAnswer) {
    //create label, create radio button, return element with both in
    let questionLabel=document.createElement('label')
    //todo set attributes
    questionLabel.innerHTML = answerText

    let radioButton = document.createElement("INPUT");
    //w3schools - create a radio button element
    //todo set unique id to associate with label
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", 'quest' + questionId)
    radioButton.setAttribute("value", "question.correctAnswer")
    radioButton.setAttribute("class", "correctAnswer")
     
    //todo if this is a correct answer, set appropriate attributes
    if(isCorrectAnswer) {
        radioButton.setAttribute("id", "correct")
    }

    radioButton.innerText = "question.correctAnswer"
    
    
    questionLabel.appendChild(radioButton) //link the button and the label

    return questionLabel
    
    //todo think about the structure of the html returned
    //need each answer on a new line, w radioButton on left and answer on right
}



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
    //http://localhost:3000/scores",
    let data = {name: 'userName', score: 'totalScore'}

    fetch(scoresUrl, { 
        method: 'POST',   //post adds scores to json server;  code 201 means created(request has been fulfilled and a new resource created)
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




   