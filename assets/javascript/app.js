var questionBank = {
	q1: 
	{
		question: "This country is made up of approximately 7,600 islands.",
		answerChoices: ["The Philippines", "Indonesia", "Singapore", "Malaysia"],
		answerInd: 0,
		picture: "assets/images/PI.jpg"
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
		picture: "#"
	},
	q4:
	{ 
		question: "In India, severe storm systems are called:",
		answerChoices: ["Hurricanes", "Cyclones", "Typhoons", "Super Storms"],
		answerInd: 1,
		picture: "#"
	},
	q5:
	{
		question: "Which of these is the driest hot desert?",
		answerChoices: ["Gobi Desert", "Sahara Desert", "Atacama Desert", "Gibson Desert"],
		answerInd: 2,
		picture: "#"
	},
	q6:
	{
		question: "What is a ring-shaped coral reef called?",
		answerChoices: ["Fringing Reef", "Barrier Reef", "Cay", "Atoll"],
		answerInd: 3,
		picture: "#"
	},
	q7:
	{
		question: "Which of these animals is NOT found in Antarctica?",
		answerChoices: ["Adelie Penguin", "Weddell Seal", "Gentoo Penguin", "Black-tailed Gull"],
		answerInd: 3,
		picture: "#"
	},
	q8:
	{
		question: "What is the world's largest island?",
		answerChoices: ["Greenland", "Australia", "Madagascar", "Indonesia"],
		answerInd: 0,
		picture: "#"
	}
};
var currentQuestion = "q1";
var questionCount = 1;
var currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
var currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
var questionDone = false;
var answerCorrect;
var userChoice = "";
var questionTimer = 4;
var answerTimer = 3;
var defaultQuestionTimer = 4;
var defaultAnswerTimer = 3;
var answerChoiceCount = 4;
var quesCounter;
var ansCounter;


/*
======================== 
Question Page Functions 
========================
*/

function nextPage() {
	$("#start").on("click", function() {
		$("#start").prop("disabled",true); // was getting a funky error, this fixes it
		$("#intro").toggle();
		$("#question-content").toggle();
		questionPageTimer();
		evaluateResponse();
	});
}
function evaluateResponse() {
	if (questionDone === false) {
		$("li").on("click", null, this, function(){
			window.clearInterval(quesCounter);
			userChoice = $(this).html();
			console.log(this.id)
			console.log(userChoice);
			if (userChoice === currentCorrectAns) {
				answerCorrect = true;
				console.log("yes, correct response")
			} 
			else {
				answerCorrect = false;
				console.log("no, wrong response")
			}
			questionTimer = defaultQuestionTimer;
			questionDone = true;
			answerPage();
		})
	}
}
function questionPageTimer() {
	$("#qTimer").html(questionTimer);
	quesCounter = setInterval(function () {
		questionTimer--;
		$("#qTimer").html(questionTimer);
		if (questionTimer <= 0) {
	 		questionDone = true;
	 		answerCorrect = "";
	 		clearInterval(quesCounter);
	 		answerPage();
 		};
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
	$(".background-img").css("background-image", 'url('+ questionBank[currentQuestion].picture) + ")";
	questionDone = false;
	console.log("this happened");
}
function answerPageTimer() {
	$("#aTimer").html(defaultAnswerTimer);
	ansCounter = setInterval(function () {
		answerTimer--;
		$("#aTimer").html(answerTimer);
		if (answerTimer <= 0) {		 		
	 		questionDone = false;
	 		console.log("answer page timer done");
	 		clearInterval(ansCounter);
	 		questionCount++;
	 		changeQuestion();
 		};
	}, 1000);
}


function changeQuestion() {
	if (questionCount <= 8) {
		answerTimer = defaultAnswerTimer;
		questionTimer = defaultQuestionTimer;
		questionDone = false;
		answerCorrect = "";
		userChoice = "";

		$("#answer-page").toggle();
		$("#question-content").toggle();
		currentQuestion = "q" + questionCount;
		$("#current-question").html(questionBank[currentQuestion].question);
		console.log("current question: " + questionBank[currentQuestion].question);
		currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
		currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
		$(".ans-option").prop("disabled", false);
		var options = $(".ans-option");

		for (i = 0; i < answerChoiceCount; i++) {
			var ansId = "#a" + (i+1).toString();
			console.log(ansId);
			console.log(questionBank[currentQuestion].answerChoices[i]);
			$(ansId).html(questionBank[currentQuestion].answerChoices[i]);
		}
	}
	console.log("changeQuestion is done");
	questionPageTimer();
	evaluateResponse();
}

$(document).ready(function(){
	nextPage();
});















