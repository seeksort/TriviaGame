var questionBank = {
	q1: 
	{
		question: "Which of these is the driest hot desert?",
		answerChoices: ["Gobi Desert", "Sahara Desert", "Atacama Desert", "Gibson Desert"],
		answerInd: 2,
		picture: "assets/images/atacama.jpg"
	},
	q2:
	{ 
		question: "This is the highest mountain in the Southern Hemisphere.",
		answerChoices: ["K2", "Aconcagua", "Vinson Massif", "Mauna Kea"],
		answerInd: 1,
		picture: "assets/images/Aconcagua.jpg"
	},
	q3:
	{
		question: "The Amazon River flows through each of these countries EXCEPT:",
		answerChoices: ["Columbia", "Brazil", "Ecuador", "Venezuela"],
		answerInd: 3,
		picture: "assets/images/amazon.jpg"
	},
	q4:
	{ 
		question: "In India, severe storm systems are called:",
		answerChoices: ["Hurricanes", "Cyclones", "Typhoons", "Super Storms"],
		answerInd: 1,
		picture: "assets/images/cyclone.jpg"
	},
	q5:
	{
		question: "What is the world's largest island?",
		answerChoices: ["Greenland", "Australia", "Madagascar", "Indonesia"],
		answerInd: 0,
		picture: "assets/images/greenland.jpg"
	},
	q6:
	{
		question: "What is a ring-shaped coral reef called?",
		answerChoices: ["Fringing Reef", "Barrier Reef", "Cay", "Atoll"],
		answerInd: 3,
		picture: "assets/images/atoll.jpg"
	},
	q7:
	{
		question: "Which of these animals is NOT found in Antarctica?",
		answerChoices: ["Adelie Penguin", "Weddell Seal", "Gentoo Penguin", "Black-tailed Gull"],
		answerInd: 3,
		picture: "assets/images/antarctica.jpg"
	},
	q8:
	{
		question: "This country is made up of approximately 7,600 islands.",
		answerChoices: ["The Philippines", "Maldives", "Singapore", "Malaysia"],
		answerInd: 0,
		picture: "assets/images/PI.jpg"
	}
};
var gameActive = true;
var currentQuestion = "q1";
var questionCount = 1;
var answerChosen = false;
var currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
var currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
var questionDone = false;
var answerCorrect = "";
var userChoice = "";
var questionTimer = 30;
var answerTimer = 5;
var defaultQuestionTimer = 30;
var defaultAnswerTimer = 5;
var answerChoiceCount = 4;
var quesCounter;
var ansCounter;

var gameOverCorrect = 0;
var gameOverIncorrect = 0;
var gameOverUnanswered = 0; 


/*
======================== 
Question Page Functions 
========================
*/
function nextPage() {
	$("#start").one("click", function() {
		$("#start").unbind("click");
		$("#intro").toggle();
		$("#question-content").toggle();
		questionPageTimer();
		evaluateResponse();
	});
}
function evaluateResponse() {
	if ((questionDone === false) && (answerChosen === false)) {
		$("li").one("click", function(event){
			event.stopImmediatePropagation();
			answerChosen = true;
			clearInterval(quesCounter);
			clearInterval(ansCounter);
			userChoice = $(this).html();
			if (userChoice === currentCorrectAns) {
				answerCorrect = true;
				gameOverCorrect++;
			} 
			else {
				answerCorrect = false;
				gameOverIncorrect++;
			}
			userChoice = "";
			questionTimer = defaultQuestionTimer;
			questionDone = true;
			answerPage();
		});
	}
}
function questionPageTimer() {
	clearInterval(quesCounter);
	$("#qTimer").html(questionTimer);
	quesCounter = setInterval(function () {
		questionTimer--;
		$("#qTimer").html(questionTimer);
		if (questionTimer <= 0) {
	 		questionDone = true;
	 		gameOverUnanswered++;
	 		answerCorrect = "";
	 		clearInterval(quesCounter);
	 		answerPage();
 		}
	}, 1000);
}

/*
======================== 
Answer Page Functions 
========================
*/
function answerPage() {
	if (questionDone === true) {
		$("#question-content").toggle();
		$(".ans-option").prop("disabled",true);
		$("#answer-page").toggle();
		changePicture();
		if (answerCorrect === true) {
			$("#answer-eval").html("That's correct!");
			$("#correct-answer-parent").html("<span id='correct-answer'></span>");
		} 
		else if (answerCorrect === false) {
			$("#answer-eval").html("Sorry, that's incorrect.");
			$("#correct-answer-parent").html("The correct answer was: <span id='correct-answer'>"+ currentCorrectAns +"</span>");
		} 
		else {
			$("#answer-eval").html("You ran out of time!");
			$("#correct-answer-parent").html("The correct answer was: <span id='correct-answer'>"+ currentCorrectAns +"</span>");
		}
		answerPageTimer();	
	}
}
function changePicture() {
	$('.background-img').animate({ opacity: 0.1 }, 200,function(){
		$(".background-img").css("background-image", 'url('+ questionBank[currentQuestion].picture) + ")";
		$('.background-img').animate({ opacity: 1 }, 600,function(){

        });
	});
}
function answerPageTimer() {
	clearInterval(ansCounter);
	$("#aTimer").html(defaultAnswerTimer);
	ansCounter = setInterval(answerDecrement, 1000);
}
function answerDecrement() {
	answerTimer--;
	$("#aTimer").html(answerTimer);
	if (answerTimer <= 0) {		 		
 		clearInterval(ansCounter);
 		questionCount++;
 		changeQuestion();
	}
}
function changeQuestion() {
	if (questionCount <= 8) {
		clearInterval(ansCounter);
		clearInterval(quesCounter);
		answerTimer = defaultAnswerTimer;
		questionTimer = defaultQuestionTimer;
		questionDone = false;
		answerCorrect = "";
		userChoice = "";
		answerChosen = false;

		$("#answer-page").toggle();
		$("#question-content").toggle();
		currentQuestion = "q" + questionCount;
		$("#current-question").html(questionBank[currentQuestion].question);
		currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
		currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
		for (i = 0; i < answerChoiceCount; i++) {
			var ansId = "#a" + (i+1).toString();
			$(ansId).html(questionBank[currentQuestion].answerChoices[i]);
		}
		questionPageTimer();
		evaluateResponse();
	}
	else {
		$("#correct-num").html(gameOverCorrect);
		$("#incorrect-num").html(gameOverIncorrect);
		$("#unanswered-num").html(gameOverUnanswered);
		$("#answer-page").toggle();
		$("#game-over").toggle();
		gameActive = false;
		gameControl();
	}
}
function restartGame(event) {
	event.stopImmediatePropagation();
	currentQuestion = "q1";
	questionCount = 1;
	answerTimer = defaultAnswerTimer;
	questionTimer = defaultQuestionTimer;
	questionDone = false;
	answerCorrect = "";
	userChoice = "";
	answerChosen = false;
	gameActive = true;
	gameOverCorrect = 0;
	gameOverIncorrect = 0;
	gameOverUnanswered = 0; 

	$("#current-question").html(questionBank[currentQuestion].question);
		currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
		currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
		for (j = 0; j < answerChoiceCount; j++) {
			var ansId = "#a" + (j+1).toString();
			$(ansId).html(questionBank[currentQuestion].answerChoices[j]);
		}
	$("#game-over").toggle();
	$("#question-content").toggle();
	questionPageTimer();
	evaluateResponse();
}
function gameControl() {
	if (gameActive === true) {
		nextPage();
	} 
	else {
		$("#restart").on("click", restartGame);
	}
}

$(document).ready(function() {
	gameControl();
});















