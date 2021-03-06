$(document).ready(function() {
	
	// array of all questions as objects
	var questObjArr = [
		{
			question: "In which play by William Shakespeare did Olivia fall for Viola?",
			options: ["Twelfth Night", "Hamlet", "Henry VIII", "The Count of Monte Cristo"],
			answer: "Twelfth Night",
		},

		{
			question: "In which story by Sir Arthur Conan Doyle did hair color play an important role?",
			options: ["The White Company", "The Red-Headed League", "Hair of the Dog", "Shades of Red and White"],
			answer: "The Red-Headed League",
		},

		{
			question: "What was the name of the paranoid android in <em>The Hitchhiker\'s Guide to the Galaxy</em> by Douglas Adams?",
			options: ["John", "Gary", "Marvin", "Reginald"],
			answer: "Marvin",
		},

		{
			question: "What was the degree held by Gillian in <em>The Hitchhiker\'s Guide to the Galaxy</em> by Douglas Adams?",
			options: ["Botany", "Astronomy", "Neuroscience", "Astrophysics"],
			answer: "Astrophysics",
		},

		{
			question: "Who was the artist responsible for the fjords of Earth in <em>The Hitchhiker\'s Guide to the Galaxy</em> by Douglas Adams?",
			options: ["Slartibartfast", "God", "Fred", "Googolmunchkiss"],
			answer: "Slartibartfast",
		},

		{
			question: "What was the name of the spaceship commandeered by Zaphod Beeblebrox in <em>The Hitchhiker\'s Guide to the Galaxy</em> by Douglas Adams?",
			options: ["Spear of Light", "Heart of Gold", "Rust Bucket", "Z23-A4"],
			answer: "Heart of Gold",
		},

		{
			question: "A supposed creature roamed the moors in which of Sir Arthur Conan Doyle\'s Sherlock Holmes mysteries?",
			options: ["The Adventures of Sherlock Holmes", "The Continuing Adventures of Sherlock Holmes", "The Hound of the Baskervilles", "The Devil of the Bog"],
			answer: "The Hound of the Baskervilles",
		},

		{
			question: "In which play by William Shakespeare are the adversaries Benedick and beatrice tricked into confessing their love for eachother?",
			options: ["King Lear", "The Unity of Foes", "The Tempest", "Much Ado About Nothing"],
			answer: "Much Ado About Nothing",
		},

		{
			question: "Who was Sherlock Holmes\' greatest adversary?",
			options: ["Professor Moriarty", "Doctor Denublio", "Inspector Lestrade", "Professor Phimpkin"],
			answer: "Professor Moriarty",
		},

		{
			question: "Who died while defending the hobits in <em>The Fellowship of the Ring</em> by J. R. R. Tolkien?",
			options: ["Aragorn", "Boromir", "Fatty", "Gimli"],
			answer: "Boromir",
		},

		{
			question: "What mysterious character \"...remembers the first raindrop and the first acorn...\" in <em>The Fellowship of the Ring</em> by J. R. R. Tolkien?",
			options: ["Saruman", "Gandalf", "Tom Bombadil", "Galadriel"],
			answer: "Tom Bombadil",
		},

		{
			question: "In <em>The Lord of the Rings</em> trilogy by J. R. R. Tolkien, what was the name of the character Gollum prior to his seduction by the ring?",
			options: ["Deagol", "Merry", "Toby", "Smeagol"],
			answer: "Smeagol",
		},

		{
			question: "In Isaac Asimov\'s <em>Foundation</em> series, what was the name of the branch science which allowed for the establishment of the Foundation in order to avert a galactic dark age?",
			options: ["Psychohistory", "Chaos Theory", "Quantum Social Articulation", "Galactic Intersocial Engineering"],
			answer: "Psychohistory",
		},

		{
			question: "In Isaac Asimov\'s <em>Foundation</em> series, who was the scientist who was considered the forefather of the Foundation?",
			options: ["Dane Ackwood", "Hari Seldon", "Michaela Gybaldi", "Harvey Dent"],
			answer: "Hari Seldon",
		},

		{
			question: "What animal was Aslan, the guardian of Narnia in <em>The Lion, the Witch and the Wardrobe</em> by C. S. Lewis?",
			options: ["Bear", "Tiger", "Lion", "Sea Sponge"],
			answer: "Lion",
		},

		{
			question: "What was NOT one of \"The Three Laws of Robotics\" first introduced in <em>I, Robot</em> by Isaac Asimov?",
			options: ["Self-preservation.", "Protecting humans.", "Obeying humans.", "Protecting its manufacturer's financial interests."],
			answer: "Protecting its manufacturer's financial interests.",
		}
	];

	var questSelectArr = [];

	// keeps track of correct/incorrect responses
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
		console.log(questSelectArr[counters.currQuest]);
		console.log('Countdown ' + timeLeft + 's');

		// will continue to operate until every question has been answered
		if(counters.currQuest < questSelectArr.length) {

			$("#quest_line").html('<h2 class="text-center question" style="display:none; border-bottom: solid 2px #D5AE2D;">' + questSelectArr[counters.currQuest].question + '</h2>');
			$(".question").fadeIn(2000);

			//fades in choices
			var i = 0;
			var q = setInterval(function() {

				if(i < 4) {
					$("#quest_choices").append('<h2 class="text-center player_choices" value="' + i + '" style="display:none;">' + questSelectArr[counters.currQuest].options[i] + '</h2>');
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
						$("#seconds").attr("style", "color: #EA2A13");
					}
				}, 1000);

				// pops out choice on hover
				$(".player_choices").hover(
					function() {
						$(this).animate({
							"font-size": "40px",
						}, 300, function() {

						});
					}, function() {
						$(this).animate({
							"font-size": "30px",
						}, 0, function() {

						});
					});

				// waits for an answer to be chosen by the player
				$(".player_choices").on("click", function() {

					playerChoice = questSelectArr[counters.currQuest].options[$(this).attr('value')];

					console.log($(this).attr('value'));
					console.log(playerChoice);

					// executes if the player makes the right guess
					if(playerChoice == questSelectArr[counters.currQuest].answer) {
						$(this).attr("class", "text-center chosen");
						$(this).attr("style", "color: #13EA15");
						$(".player_choices").fadeOut(1300);
						$("#quest_timer").fadeOut();
						clearInterval(t);
						setTimeout(function() {
							correctGuess();
						}, 1000);
					}

					// executes if the player makes the wrong guess
					else {
						$(this).attr("class", "text-center chosen");
						$(this).attr("style", "color: #EA2A13")
						$(".player_choices").fadeOut(1300);
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
		}, 1500);
			
		setTimeout(function() {
			$("#game_message").append('<h2 class="no_time1" style="display:none;">The correct answer was...</h2>');
			$(".no_time1").fadeIn(2500);
		}, 3000);

		setTimeout(function() {
			$("#game_message").append('<h2 class="no_time2" style="display:none; color: #13EA15">' + questSelectArr[counters.currQuest].answer + '</h2>');
			$(".no_time2").fadeIn("fast");
		}, 5000);

		setTimeout(function() {
			if(counters.currQuest == (questSelectArr.length - 1)) {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				gameClear();
			}
		}, 7000);

		setTimeout(function() {
			counters.currQuest++;
			counters.timedOut++;
			gameLoop();
		}, 9000);

	}

	function correctGuess() {

		console.log("correct");
		gameClear();

		setTimeout(function() {
			$("#game_message").html('<h2 class="correct_msg" style="display:none;">That was correct!</h2>');
			$(".correct_msg").fadeIn();
		}, 1500);
			
		setTimeout(function() {
			if(counters.currQuest == (questSelectArr.length - 1)) {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">Now for the next question...</h2>');
				$(".correct_msg1").fadeIn();
			}
		}, 3000);

		setTimeout(function() {
			gameClear();
		}, 6000);

		setTimeout(function() {
			counters.currQuest++;
			counters.correct++;
			gameLoop();
		}, 8000);

	}

	function incorrectGuess() {

		console.log("incorrect");
		gameClear();

		setTimeout(function() {
			$("#game_message").html('<h2 class="incorrect_msg" style="display:none;">I\'m sorry, that wasn\'t correct</h2>');
			$(".incorrect_msg").fadeIn();
		}, 1500);

		setTimeout(function() {
			$("#game_message").append('<h2 class="no_time1" style="display:none;">The correct answer was...</h2>');
			$(".no_time1").fadeIn(2500);
		}, 3000);

		setTimeout(function() {
			$("#game_message").append('<h2 class="no_time2" style="display:none; color: #13EA15">' + questSelectArr[counters.currQuest].answer + '</h2>');
			$(".no_time2").fadeIn("fast");
		}, 5000);
			
		setTimeout(function() {
			if(counters.currQuest == (questSelectArr.length - 1)) {
				gameClear();
				$("#game_message").append('<h2 class="correct_msg1" style="display:none;">That was the last question! Time to see your results...</h2>');
				$(".correct_msg1").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="incorrect_msg1" style="display:none;">Better luck on the next one!</h2>');
				$(".incorrect_msg1").fadeIn();
			}
		}, 6000);

		setTimeout(function() {
			gameClear();
		}, 7000);

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
		}, 2000);
			
		setTimeout(function() {
			$(".result_row").append('<div class="col-md-4 result2"><h3 class="count2" style="display:none;">Incorrect guesses</h3></div>');
			$(".count2").fadeIn();
		}, 3000);

		setTimeout(function() {
			$(".result_row").append('<div class="col-md-4 result3"><h3 class="count3" style="display:none;">Expired guesses</h3></div>');
			$(".count3").fadeIn();
		}, 4000);		

		setTimeout(function() {
			$(".result1").append('<h2 class="cnt1" style="display:none;">' + counters.correct + '<h2>');
			$(".result2").append('<h2 class="cnt2" style="display:none;">' + counters.incorrect + '<h2>');
			$(".result3").append('<h2 class="cnt3" style="display:none;">' + counters.timedOut + '<h2>');
			$(".cnt1").fadeIn();
			$(".cnt2").fadeIn();
			$(".cnt3").fadeIn();
		}, 5000);

		setTimeout(function() {
			if(counters.correct === questSelectArr.length) {
				$("#game_message").append('<h2 class="victory" style="display:none;">Congratulations, you won!</h2>');
				$(".victory").fadeIn();
			}
			else {
				$("#game_message").append('<h2 class="defeat" style="display:none;">Nice try!  Go again?</h2>');
				$(".defeat").fadeIn();
			}
		}, 6000);

		setTimeout(function() {
			$("#game_message").append('<button type="button" class="btn btn-default" id="restart_btn" style="display:none;">Replay</button>');
			$("#restart_btn").fadeIn();
			$("#restart_btn").on("click", function() {
				gameRestart();
			});
		}, 7000);

	}

	// resets to welcome screen 
	function gameRestart() {

		counters.currQuest = 0;
		counters.correct = 0;
		counters.incorrect = 0;
		counters.timedOut = 0;

		gameClear();

		questSelectArr.length = 0;

		setTimeout(function() {
			gameSetup();
		}, 3000);

	}

	// empties the main area of the page
	function gameClear() {

		$("#game_message").fadeOut(300);
		$("#quest_line").fadeOut(300);
		$("#quest_choices").fadeOut(300);
		$("#quest_timer").fadeOut(300);

		setTimeout(function() {

			$("#game_message").empty();
			$("#quest_line").empty();
			$("#quest_choices").empty();
			$("#quest_timer").empty();

			$("#game_message").fadeIn(0);
			$("#quest_line").fadeIn(0);
			$("#quest_choices").fadeIn(0);
			$("#quest_timer").fadeIn(0);

		}, 1000);

	}

	// creates the start button which is all that is initially displayed in the main page area and waits for it to be pressed
	function gameSetup() {

		questFiller();

		$("#game_message").html('<button type="button" class="btn btn-default" id="start_btn">Start Quiz!</button>');

		$("#start_btn").on("click", function() {
			gameLoop();
		});
	
	}

	// creates the quest selection for the current game
	function questFiller() {
		if(questSelectArr.length < 8) {
			var x = Math.floor((Math.random() * questObjArr.length));
			var y = questObjArr[x];
			if(questSelectArr.includes(y)) {
				questFiller();
			}
			else {
				questSelectArr.push(y);
				questFiller();
			}
		}
		else {
			console.log(questSelectArr);
		}
	}

	gameSetup();

});