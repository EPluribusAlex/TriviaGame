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

	var counters = {
		currQuest: 0,
		correct: 0,
		incorrect: 0,
		timedOut: 0,
	}

	// primary function controlling gameflow
	function gameLoop() {

		$("#game_message").empty();

		var timeLeft = 15;
		var playerChoice;

		console.log("Question index: " + counters.currQuest);
		console.log("Correct guesses count: " + counters.correct);
		console.log("Incorrect guesses count: " + counters.incorrect);
		console.log("timed out count: " + counters.timedOut);
		console.log(questObjArr[counters.currQuest]);
		console.log('Countdown ' + timeLeft + 's');

		// will continue to operate until every question has been answered
		if(counters.currQuest < questObjArr.length) {

			$("#quest_line").html('<h2 class="text-center question" style="display:none;">' + questObjArr[counters.currQuest].question + '</h2>');
			$(".question").fadeIn(2000);

			//fades in choices
			var i = 0;
			var q = setInterval(function() {

				if(i < 4) {
					$("#quest_choices").append('<h2 class="text-center player_choices" value="' + i + '" style="display:none;">' + questObjArr[counters.currQuest].options[i] + '</h2>');
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
						timeOver();
					}
					else if(timeLeft < 5) {
						$("#seconds").addClass("text-danger");
					}
				}, 1000);

				// waits for an answer to be chosen by the player
				$(".player_choices").on("click", function() {

					playerChoice = questObjArr[counters.currQuest].options[$(this).attr('value')];

					console.log($(this).attr('value'));
					console.log(playerChoice);

					// executes if the player makes the right guess
					if(playerChoice == questObjArr[counters.currQuest].answer) {
						$(this).attr("class", "text-center text-success chosen");
						$(".player_choices").fadeOut("slow");
						$("#quest_timer").fadeOut();
						clearInterval(t);
						setTimeout(function() {
							correctGuess();
						}, 1000);
					}

					// executes if the player makes the wrong guess
					else {
						$(this).attr("class", "text-center text-danger chosen");
						$(".player_choices").fadeOut("slow");
						$("#quest_timer").fadeOut();
						clearInterval(t);
						setTimeout(function() {
							incorrectGuess();
						}, 1000);
					}

				});

			}, 2000);

		}

		else {
			gameEnd();
		}

	}

	function timeOver() {

		console.log("time over");
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
			$("#game_message").append('<h2 class="text-success no_time2" style="display:none;">' + questObjArr[counters.currQuest].answer + '</h2>');
			$(".no_time2").fadeIn("fast");
		}, 7000);

		setTimeout(function() {
			if(counters.currQuest == (questObjArr.length - 1)) {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				gameClear();
			}
		}, 9000);

		setTimeout(function() {
			counters.currQuest++;
			counters.timedOut++;
			gameLoop();
		}, 12000);

	}

	function correctGuess() {

		console.log("correct");
		gameClear();

		setTimeout(function() {
			$("#game_message").html('<h2 class="correct_msg" style="display:none;">That was correct!</h2>');
			$(".correct_msg").fadeIn();
		}, 2000);
			
		setTimeout(function() {
			if(counters.currQuest == (questObjArr.length - 1)) {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">Now for the next question...</h2>');
				$(".correct_msg1").fadeIn();
			}
		}, 4000);

		setTimeout(function() {
			gameClear();
		}, 6000);

		setTimeout(function() {
			counters.currQuest++;
			counters.correct++;
			gameLoop();
		}, 9000);

	}

	function incorrectGuess() {

		console.log("incorrect");
		gameClear();

		setTimeout(function() {
			$("#game_message").html('<h2 class="incorrect_msg" style="display:none;">I\'m sorry, that wasn\'t correct</h2>');
			$(".incorrect_msg").fadeIn();
		}, 2000);
			
		setTimeout(function() {
			if(counters.currQuest == (questObjArr.length - 1)) {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="incorrect_msg1" style="display:none;">Better luck on the next one!</h2>');
				$(".incorrect_msg1").fadeIn();
			}
		}, 4000);

		setTimeout(function() {
			gameClear();
		}, 6000);

		setTimeout(function() {
			counters.currQuest++;
			counters.incorrect++;
			gameLoop();
		}, 9000);

	}

	function gameEnd() {

		console.log("game end");
		gameClear();

		setTimeout(function() {
			$("#game_message").html('<div class="row result_row"><div class="col-md-4 result1"><h3 class="count1" style="display:none;">Correct guesses</h3></div></div>');
			$(".count1").fadeIn();
		}, 3000);
			
		setTimeout(function() {
			$(".result_row").append('<div class="col-md-4 result2"><h3 class="count2" style="display:none;">Incorrect guesses</h3></div>');
			$(".count2").fadeIn();
		}, 4000);

		setTimeout(function() {
			$(".result_row").append('<div class="col-md-4 result3"><h3 class="count3" style="display:none;">Expired guesses</h3></div>');
			$(".count3").fadeIn();
		}, 5000);		

		setTimeout(function() {
			$(".result1").append('<h2 class="text-success cnt1" style="display:none;">' + counters.correct + '<h2>');
			$(".result2").append('<h2 class="text-danger cnt2" style="display:none;">' + counters.incorrect + '<h2>');
			$(".result3").append('<h2 class="text-danger cnt3" style="display:none;">' + counters.timedOut + '<h2>');
			$(".cnt1").fadeIn();
			$(".cnt2").fadeIn();
			$(".cnt3").fadeIn();
		}, 6000);

		setTimeout(function() {
			if(counters.correct === questObjArr.length) {
				$("#game_message").append('<h2 class="victory" style="display:none;">Congratulations, you won!</h2>');
				$(".victory").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="defeat" style="display:none;">Nice try!  Go again?</h2>');
				$(".defeat").fadeIn();
			}
		}, 8000);

		setTimeout(function() {
			$("#game_message").append('<button type="button" class="btn btn-default" id="restart_btn" style="display:none;">Replay</button>');
			$("#restart_btn").fadeIn();
			$("#restart_btn").on("click", function() {
				gameRestart();
			});
		}, 9000);

	}

	// resets to welcome screen 
	function gameRestart() {

		counters.currQuest = 0;
		counters.correct = 0;
		counters.incorrect = 0;
		counters.timedOut = 0;

		gameClear();

		setTimeout(function() {
			gameSetup();
		}, 3000);

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

	// creates the start button which is all that is initially displayed in the main page area and waits for it to be pressed
	function gameSetup() {

		console.log(questObjArr);

		$("#game_message").html('<button type="button" class="btn btn-default" id="start_btn">Start Quiz!</button>');

		$("#start_btn").on("click", function() {
			gameLoop();
		});
	
	}

	gameSetup();

});