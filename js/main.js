$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startExperienceScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Begin</a></p>";
	// startMinimalScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Minimal Experience</a></p>";
	// startNoExperienceScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>No Experience</a></p>";
	// $(".experienceArea").html(startExperienceScreen);$(".minimalArea").html(startMinimalScreen);$(".noExperienceArea").html(startNoExperienceScreen);
	$(".experienceArea").html(startExperienceScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	// lesson();
	generateHTML();


	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".next-button", function(event){
	  // added line to test issue on GitHub Viewer
	clickSound.play();
	// lesson();
	generateHTML();


	// timerWrapper();

});

$("body").on("click", ".answer", function(event){
	answeredQuestion = true;
	clickSound.play();
	 selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".experienceArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/checkmark-24.png'>";
	$(".expereienceArea").html(gameHTML);
	setTimeout(wait, 1000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".experienceArea").html(gameHTML);
	setTimeout(wait, 1000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".experienceArea").html(gameHTML);
}

function lesson() {
	lesson1 =  "<p class='text-center timer-p'>Lesson 1 - What is Python? </p> <p class= 'text-center'>" + lesson1 + "</p>" + 	startExperienceScreen + "<p class='text-center next-button-container'><a class='btn btn-primary btn-lg btn-block next-button' href='#' role='button'>Start quiz</a></p>";
	$(".experienceArea").html(lesson1);
}

function wait() {
	if (questionCounter <  4) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".experienceArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	lesson();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who Invented Python?", "What year was Python released?", "Python's syntax allows users to write programs using less lines of code compared to other programming languages?"];
var answerArray = [["Steve Jobs", "Bjarne Stroustrup", "Guido Van Rossum", "Anders Hejlsberg"], ["1995","1991","1987","2003"], ["True", "False"], ["True","False"]];
var imageArray = ["<img class='center-block img-right' src='img/australia.png'>", "<img class='center-block img-right' src='img/liberia.png'>", "<img class='center-block img-right' src='img/taiwan.png'>", "<img class='center-block img-right' src='img/japan.png'>", "<img class='center-block img-right' src='img/china.png'>", "<img class='center-block img-right' src='img/turkey.png'>", "<img class='center-block img-right' src='img/colombia.png'>", "<img class='center-block img-right' src='img/india.png'>"];
var correctAnswers = ["C. Guido Van Rossum", "B. 1991", "A. True", "B. False"];
var questionCounter = 0;
var lesson1 = "What is Python? Python is a programming language released in 1991 by Guido Van Rossum. Python is user-friendly and widely considered as one of the most popular programming languages. Python combines standard English with programming syntax to make it more understandable for the user. In addition, python’s syntax allows the programmer to solve a problem using less lines of code. Python also has a wide variety of libraries and frameworks that can be utilized by programmers to fit their needs. However, Python is slower compared to other languages."
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
