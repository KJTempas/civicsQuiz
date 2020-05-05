 
//finding elements in the html
let indivScore=document.querySelector('#yourScore')
let submitButton = document.querySelector('#submit')
let studentNameInput = document.querySelector('#name')
let nextUserButton = document.querySelector('#nextUser')
let averageButton = document.querySelector('#average')
let averageScoreLabel = document.querySelector('#averageScore')
let questionsUrl = "http://localhost:3000/questions"
let scoresUrl = "http://localhost:3000/scores"

//localStorage.removeItem("Zion") //if you need to remove something or rt click and clear local storage

//note: to stop server-    Control+C 
//to start server - in terminal type this:  node_modules/.bin/json-server --watch server.json        OR up arrow in terminal
//to view server- http://localhost:3000/questions or http://localhost:3000/scores
fetch(questionsUrl) //go the the questionsUrl and fetch the questions 
    .then( resp => resp.json()) //convert object to JSON
    .then( questions => {
                                
            let questionCounter = 1;
            
            let questionContainer = document.querySelector('#question-container')
            questions.forEach(question => { //loop through all of the questions in server.json
            
                let singleQuestElement=document.createElement('div')
                //each question will go in its own div that has the class name 'questions'
                singleQuestElement.classList.add('questions')

                //inside each div the question#  will be a header4 element
                let header = document.createElement('h4')
                header.innerHTML= `Question ${questionCounter}`
                questionCounter++  

                singleQuestElement.appendChild(header) //add the header to the div element

                let questionText= document.createElement('p')
                questionText.innerHTML = question.question //set text of the p element to a question from the server
                singleQuestElement.appendChild(questionText) //add the question to the div
                questionContainer.appendChild(singleQuestElement)

            let allAnswerElements = [] //array to hold all answers
                    //call buildAnswerElement function once for each answer, and add these to the array
            let correct = buildAnswerElement(question.correctAnswer, question.id, true) // is correct answer
            allAnswerElements.push(correct) //add correct to the array

            question.wrongAnswers.forEach (answer =>{ //loop through the wrong answers, and add them to the array
                wrong = buildAnswerElement(answer, question.id, false)
                allAnswerElements.push(wrong)
            })

            allAnswerElements = shuffle(allAnswerElements) //calls function below to randomize answers
    
            allAnswerElements.forEach( function(el) {
                singleQuestElement.appendChild(el) //add all of the answers to the div(item)
            })
        });
        
})

function shuffle(arrayOfElements) {
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

//method to make one answer radio button  */
function buildAnswerElement(answerText, questionId, isCorrectAnswer) {
    //create label, create radio button, return element with both in
    let answerEl = document.createElement('div')
    let questionLabel=document.createElement('label') 
    questionLabel.innerHTML = answerText 

    let radioButton = document.createElement("INPUT");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", 'question' + questionId)
    radioButton.setAttribute("class", "button")
    radioButton.setAttribute("value", answerText)   
     
    //if this is a correct answer, set id to correct 
    if(isCorrectAnswer) {
        radioButton.setAttribute("id", "correct")
    }

    answerEl.appendChild(radioButton)
    answerEl.appendChild(questionLabel)

    return answerEl 
}


submitButton.addEventListener('click', function() {  
    //when the user clicks the submit button
    let userName = studentNameInput.value  //get the student name
    // add validation that name >1character
    if(userName.length<1) {
        alert('Enter a user name')
        return
    }
    //call function to make sure name not already in server.json
    checkForDuplicateName(userName, function(isDupe) {  
        if (isDupe) {
            alert('You already took the quiz.')
        }
        else{
            //alert('Hello new user, scoring your quiz!')
    let questions = document.querySelectorAll('.questions')  //select all w/ class 'questions' - all question div elements
    //call function to calculate if answers are correct or not - returns totalScore
    totalScore=calculateScoreForIndiv() 
   
    //show person's score after looping is complete
    indivScore.innerHTML = `You scored ${totalScore} out of ${questions.length}`

    let data = {name: userName, score: totalScore}

    fetch(scoresUrl, { 
        method: 'POST',   //post adds scores to json server
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data) //converting object into JSON using stringify
        })
        .then(resp => { 
            console.log('response from posting score to scores', resp)
        })
    } 
}) 


nextUserButton.addEventListener('click', function() {
    //clear name input
    studentNameInput.value=''
    //clear result field
    indivScore.innerHTML= ""
    //call function to uncheck all radio buttons
    uncheck()  
    })   
})

averageButton.addEventListener('click', function() {
    getScoresToChart()
   
})

function getRadioValue(questNumber) {
    let radioButtonEle = document.getElementsByName(questNumber); 
    
      let userAnswer='';
    for(let i = 0; i < radioButtonEle.length; i++) { //loop through radio button elements for each question
        //if the element is checked, then that element's value is the user Answer
        if(radioButtonEle[i].checked) {  
            userAnswer = radioButtonEle[i].value; 
        } 
    } 
    return userAnswer
} 

function uncheck() { //loop through and set all radio buttons to unchecked
    let allRadioButtonEle = document.getElementsByClassName("button"); 
    for(let x=0; x<allRadioButtonEle.length; x++) {
        allRadioButtonEle[x].checked=false
    }
}

function getScoresToChart() {

    fetch(scoresUrl) 
        .then (resp =>resp.json() )    //converts response to a JSON object
        .then(scores => {
        //call method to draw chart
            chartResultsAndAverage(scores)
    })
   }
 
function checkForDuplicateName(userName, callback) {

    let existingUserScoreUrl = `http://127.0.0.1:3000/scores?name=${userName}`
 //search 3000/scores where userName= userName provided
    fetch(existingUserScoreUrl) //get scores from server.json
        .then (resp =>resp.json() )    //converts response to a JSON object
        .then(scores => {   
            if(scores.length == 0) {
                // no duplicate is found
                callback(false)
            } else{
                //don't alert here. the callback will handle whatever logic is needed
                callback(true)
            }
         }) 
}

function calculateScoreForIndiv(){  
    let totalScore=0
    let questions = document.querySelectorAll('.questions')  
    wrongAnswerList=[]
    questions.forEach(function(question) {  // loop though a node list of questions
        
        let correctAnswerEl = question.querySelector('#correct')  //find the correct answer for this question
        let correctAnswer = correctAnswerEl.getAttribute('value')
        let questNumber = correctAnswerEl.getAttribute('name') 
        
        //get the user's answer -call the getRadioValue function 
        userAnswer =getRadioValue(questNumber)
    
        if(userAnswer ===correctAnswer) {  //if the two answers are the same, add one to the total
            totalScore++
        }else{ //otherwise, add the correct answer to an array to show user 
             
            wrongAnswerString = ('The correct answer to ' + questNumber + ' is ' + correctAnswer + '\n')
            wrongAnswerList.push(wrongAnswerString)
            
        }  

    })
    
        if (wrongAnswerList.length === 0) {
            alert('Congratulations! You got all of the questions correct!')
        } else {
            alert('Oops, you missed ' + wrongAnswerList.length + ' question(s).')
            
                alert(wrongAnswerList)
            }
  
    
    return totalScore
}


        
