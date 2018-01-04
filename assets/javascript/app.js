$(document).ready(function() {
	
	var questObjArr = [
		{
			question: "A1?",
			options: ["A", "B", "C", "D"],
			answer: "A",
		},

		{
			question: "B1?",
			options: ["A", "B", "C", "D"],
			answer: "B",
		},

		{
			question: "C1?",
			options: ["A", "B", "C", "D"],
			answer: "C",
		},

		{
			question: "D1?",
			options: ["A", "B", "C", "D"],
			answer: "D",
		},

		{
			question: "A2?",
			options: ["A", "B", "C", "D"],
			answer: "A",
		},

		{
			question: "B2?",
			options: ["A", "B", "C", "D"],
			answer: "B",
		},

		{
			question: "C2?",
			options: ["A", "B", "C", "D"],
			answer: "C",
		},

		{
			question: "D2?",
			options: ["A", "B", "C", "D"],
			answer: "D",
		},

		{
			question: "A3?",
			options: ["A", "B", "C", "D"],
			answer: "A",
		},

		{
			question: "B3?",
			options: ["A", "B", "C", "D"],
			answer: "B",
		},
	];

	console.log(questObjArr);

	var correctGuessCount = 0;

	function gameLoop() {

		$("#game_message").empty();

		var currQuest = 0;
		var timeLeft = 30;
		var playerChoice;

		console.log(questObjArr[currQuest]);
		console.log('Countdown ' + timeLeft + 's');

		$("#question_line").html('<h2 class="text-center">' + questObjArr[currQuest].question + '</h2>');
		for(var i = 0; i < 4; i++) {
			$("#quest_responses").append('<h2 class="text-center player_choices" value="' + i + '">' + questObjArr[currQuest].options[i] + '</h2>');
		}

		var t = setInterval(function() {
			$("#question_timer").html('<h3 class="text-center">You have ' + timeLeft + ' seconds remaining...</h3>');
			timeLeft--;
			if(timeLeft < 0) {
				clearInterval(t);
				console.log('Countdown ' + timeLeft + 's');
				// timeOut();
			}
		}, 1000);

		$(".player_choices").on("click", function() {

			playerChoice = questObjArr[currQuest].options[$(this).attr('value')];

			console.log($(this).attr('value'));
			console.log(playerChoice);

			if(playerChoice == currQuest.answer) {
				// correctGuess();
			}

			else {
				// incorrectGuess();
			}

		});

	}

	$("#game_message").html('<button type="button" class="btn btn-default" id="start_btn">Start Quiz!</button>');

	$("#start_btn").on("click", function() {
		gameLoop();
	});
	
});