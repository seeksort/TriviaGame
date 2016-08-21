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
		picture: "#"
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
var currentCorrectAnsInd = questionBank[currentQuestion].answerInd;
var currentCorrectAns = questionBank[currentQuestion].answerChoices[currentCorrectAnsInd];
var questionDone = false;
var answerCorrect;
var userChoice = "";
var questionTimer = 4;
var answerTimer = 3;
var defaultQuestionTimer = 4;
var defaultAnswerTimer = 3;
var quesCounter;
var ansCounter;

function nextPage() {
	$("#start").on("click", function() {
		$("#start").prop("disabled",true); // was getting a funky error, this fixes it
		$("#intro").toggle();
		$("#question-content").toggle();
		questionPageTimer();
	});
	if (questionDone === false) {
		$("li").on("click", null, this, evaluateResponse)
	}
};
function evaluateResponse() {
	userChoice = $(this).html();
	console.log(this.id)
	console.log(userChoice);
	if (userChoice === currentCorrectAns) {
		answerCorrect = true;
		console.log("yes")
	} 
	else {
		answerCorrect = false;
		console.log("no")
	}
	questionDone = true;
	answerPage()
}
function answerPage() {
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
function questionPageTimer() {
	quesCounter = setInterval(function () {
		questionTimer--;
		$("#timer").html(questionTimer);
		if (questionTimer < 0) {
	 		questionTimer = defaultQuestionTimer;
	 		questionDone = true;
	 		clearInterval(quesCounter);
	 		answerPage();
	 		console.log("question timer: " + questionTimer)
 		};
	}, 1000);
}
function answerPageTimer() {
	ansCounter = setInterval(function () {
		answerTimer--;
		$("#timer").html(answerTimer);
		if (answerTimer < 0) {		
	 		answerTimer = defaultAnswerTimer;
	 		questionDone = false;
	 		console.log("done");
	 		clearInterval(ansCounter);
 		};
	}, 1000);
}
//TODO - the timers keep looping back to the answer page...
function changePicture() {
	//TODO
	// adjust for other images
	$(".background-img").css("background-image", 'url("assets/images/PI.jpg")')
	console.log("this happened")
}

$(document).ready( function(){
	nextPage()
});















