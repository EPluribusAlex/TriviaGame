$(document).ready(function() {
	
	// array of all questions as objects
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

	var currQuest = 0;
	var correctGuessCount = 0;
	var incorrectGuessCount = 0;
	var timedOutCount = 0;

	// primary function controlling gameflow
	function gameLoop() {

		$("#game_message").empty();

		var timeLeft = 15;
		var playerChoice;

		console.log("Question index: " + currQuest);
		console.log(questObjArr[currQuest]);
		console.log('Countdown ' + timeLeft + 's');

		// will continue to operate until every question has been answered
		if(currQuest < questObjArr.length) {

			$("#quest_line").html('<h2 class="text-center question" style="display:none;">' + questObjArr[currQuest].question + '</h2>');
			$(".question").fadeIn(2000);

			//fades in choices
			var i = 0;
			var q = setInterval(function() {

				if(i < 4) {
					$("#quest_choices").append('<h2 class="text-center player_choices" value="' + i + '" style="display:none;">' + questObjArr[currQuest].options[i] + '</h2>');
					$("[value=" + i + "]").fadeIn();
					i++;
				}

				else {
					clearInterval(q);
				}

			}, 500);

			// lets answers appear
			setTimeout(function() {

				// sets up the question timer
				var t = setInterval(function() {
					$("#quest_timer").html('<h3 class="text-center time_count">You have <span id="seconds">' + timeLeft + '</span> seconds remaining...</h3>');
					timeLeft--;
					if(timeLeft < 0) {
						clearInterval(t);
						console.log('Countdown ' + timeLeft + 's');
						timeOver();
					}
					else if(timeLeft < 5) {
						$("#seconds").addClass("text-danger");
					}
				}, 1000);

				// waits for an answer to be chosen by the player
				$(".player_choices").on("click", function() {

					playerChoice = questObjArr[currQuest].options[$(this).attr('value')];

					console.log($(this).attr('value'));
					console.log(playerChoice);

					// executes if the player makes the right guess
					if(playerChoice == questObjArr[currQuest].answer) {
						console.log("correct");
						clearInterval(t);
						correctGuess();
					}

					// executes if the player makes the wrong guess
					else {
						console.log("incorrect");
						clearInterval(t);
						incorrectGuess();
					}

				});

			}, 2000);

		}

		else {
			gameEnd();
		}

	}

	function timeOver() {

		gameClear();

		setTimeout(function() {
			$("#game_message").html('<h2 class="no_time" style="display:none;">Your time is up!</h2>');
			$(".no_time").fadeIn();
		}, 2000);
			
		setTimeout(function() {
			$("#game_message").append('<h2 class="no_time1" style="display:none;">The correct answer was...</h2>');
			$(".no_time1").fadeIn(2500);
		}, 4000);

		setTimeout(function() {
			$("#game_message").append('<h2 class="text-success no_time2" style="display:none;">' + questObjArr[currQuest].answer + '</h2>');
			$(".no_time2").fadeIn("fast");
		}, 7000);

		setTimeout(function() {
			gameClear();
		}, 9000);

		setTimeout(function() {
			currQuest++;
			timedOutCount++;
			console.log("timed out count: " + timedOutCount);
			gameLoop();
		}, 12000);

	}

	function correctGuess() {


		gameClear();

	}

	function incorrectGuess() {

		gameClear();

	}

	function gameEnd() {

		gameClear();

	}

	// empties the main area of the page
	function gameClear() {

		$("#game_message").fadeOut("slow");
		$("#quest_line").fadeOut("slow");
		$("#quest_choices").fadeOut("slow");
		$("#quest_timer").fadeOut("slow");

		setTimeout(function() {

			$("#game_message").empty();
			$("#quest_line").empty();
			$("#quest_choices").empty();
			$("#quest_timer").empty();

			$("#game_message").fadeIn(0);
			$("#quest_line").fadeIn(0);
			$("#quest_choices").fadeIn(0);
			$("#quest_timer").fadeIn(0);

		}, 2000);

	}

	// creates the start button which is all that is initially displayed in the main page area
	$("#game_message").html('<button type="button" class="btn btn-default" id="start_btn">Start Quiz!</button>');

	// waits for the player to press the start button before beginning the game
	$("#start_btn").on("click", function() {
		gameLoop();
	});
	
});