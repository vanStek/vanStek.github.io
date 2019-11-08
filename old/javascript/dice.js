
            var flag = 0;
			//event listeners
			window.onload = function(){
				document.getElementById("roll_button").addEventListener("click", game_loop);

				document.getElementById("play_again").addEventListener("click", restart)
			}


            //below are dice game functions and variables
			var total = 0;

			//shows rules
			function rules() {
				document.getElementById("directions").style.display= "block";
				document.getElementById("agree").style.display= "block";
				document.getElementById("head_directions").style.display = "block";
				document.getElementById("start").style.display = "none";
			}

			//sets up game
			function begin(){
				document.getElementById("agree").style.display = "none";
				document.getElementById("head_directions").style.display = "none";
				document.getElementById("game").style.display = "block";

			}

			//rolls dice, main script
            function roll(){
				var die1 = Math.floor((Math.random() * 6) + 1);
				var die2 = Math.floor((Math.random() * 6) + 1);
				var die3 = Math.floor((Math.random() * 6) + 1);
				var die4 = Math.floor((Math.random() * 6) + 1);

				total = die1 + die2 + die3 + die4;


				return die1 + ", " + die2 + ", " + die3 + ", and " + die4 + ", for a total of " + total + ".";
            }

			//restarts game
			function restart(){
				flag = 0;
				document.getElementById("play_again").style.display = "none";
				document.getElementById("roll_output").innerHTML = "";
				document.getElementById("win_loss").innerHTML = "";
				document.getElementById("roll_button").style.display = "block";
				document.getElementById("roll_button").removeEventListener("click", second_loop);
				document.getElementById("roll_button").addEventListener("click", game_loop);


			}

			//lots of spaghetti, could be rewritten much better
			function game_loop(){
				flag = 0;
				//while loop is not needed but i do not want to touch it for fear of messing the code up
				while (flag == 0){

						document.getElementById("roll_output").innerHTML = roll();


						if (total == 9 ||
							total == 11||
							total == 18||
							total == 24) {
							document.getElementById("win_loss").style.display = "block";
							document.getElementById("win_loss").innerHTML = "You won.";
							document.getElementById("play_again").style.display = "block";
							document.getElementById("roll_button").style.display = "none";
							flag = 1;
						}
						else if (total == 6 ||
								 total == 12||
								 total == 13||
								 total == 17||
							 	 total == 19||
							 	 total == 23) {
							document.getElementById("win_loss").style.display = "block";
							document.getElementById("win_loss").innerHTML = "You lost.";
							document.getElementById("play_again").style.display = "block";
							document.getElementById("roll_button").style.display = "none";
							flag = 1;
						}
						else{
							document.getElementById("win_loss").style.display = "block";
							document.getElementById("win_loss").innerHTML = "Roll again.";
							goal_roll = total;
							document.getElementById("first_roll").style.display = "block";
							document.getElementById("first_roll").innerHTML = "Your first roll: " + goal_roll;
							flag = 1;
							}
						}
						flag = 0;
						document.getElementById("roll_button").removeEventListener("click", game_loop);
						document.getElementById("roll_button").addEventListener("click", second_loop);

					}


			function second_loop(){

					document.getElementById("roll_output").innerHTML = roll();

					if (total == goal_roll){
						document.getElementById("win_loss").innerHTML = "You won.";
						document.getElementById("play_again").style.display = "block";
						document.getElementById("roll_button").style.display = "none";
						document.getElementById("first_roll").style.display = "none";
					}

					else if (total == 13){
						document.getElementById("win_loss").style.display = "block";
						document.getElementById("win_loss").innerHTML = "You lost.";
						document.getElementById("play_again").style.display = "block";
						document.getElementById("roll_button").style.display = "none";
						document.getElementById("first_roll").style.display = "none";
					}
					else{
						document.getElementById("win_loss").innerHTML = "Roll again.";

					}
				}
