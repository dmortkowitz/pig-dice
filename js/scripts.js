// backend
var playerOne="";
var playerTwo="";
var loseTextArray = ["Sorry, but you rolled a 1! Your efforts have returned ill fruit, like a barren land.", "In the land of pigs, rolling a 1 leads to your doom. This game is over.", "You can hear them coming. Soon, they will arrive in their pinstripe suits, their hooves pounding the floor as they take you away. The game has ended. What was it all for?"]
var winTextArray = ["Winner winner, chicken dinner! It seems that you won, and the game has ended, like all things eventually must. Why are we here?", "You have won the game, and the Boss Pig must keep his word. You are free.", "The night is dark, the future uncertain, but you have earned Boss Pig's respect, and in turn have escaped certain doom this day."];
var randomLose = loseTextArray[Math.floor(Math.random() * loseTextArray.length)];
console.log(loseTextArray[Math.floor(Math.random() * loseTextArray.length)])
var randomWin = winTextArray[Math.floor(Math.random() * winTextArray.length)];
var rollDice = function() {
	return Math.floor(6*Math.random())+1;
}

function Player(turn) {
	this.roll = 0;
	this.turnScore = 0;
	this.cumeScore = 0;
	this.turn = turn;
	this.playerName;
}

Player.prototype.rollOne = function(){
	if (this.roll === 1){
		this.turnScore = 0;
		// $("#msgCenter").text("Sorry, " + this.playerName + ", but you rolled a 1! Your efforts have returned ill fruit, like a barren land.")
	// } else if (this.roll === 6) {
	// 		alert("Winner winner, chicken dinner, " + this.playerName + "! It seems that you won. But to what end?")
		$("#msgCenter").text(randomLose);
	} else {
		this.turnScore += this.roll;
	}
}

Player.prototype.hold = function() {
	this.cumeScore += this.turnScore;
	this.turnScore = 0;
	// alert("Your turn has come to an end. And so it is, as with all things. Why are we here, " + this.playerName + "?");
}

Player.prototype.chickenDinner = function() {
	if (this.cumeScore >= 30) {
		// $("#msgCenter").text("Winner winner, chicken dinner! It seems that you won, and the game has ended, like all things eventually must. Why are we here, " + this.playerName +"?")
		$("#msgCenter").text(randomWin);
	}
}

Player.prototype.newGame = function() {
	this.roll = 0;
	this.turnScore = 0;
	this.cumeScore = 0;
	this.playerName ="";
}

var clear = function() {
	$(".playerOneName").val("");
	$(".playerTwoName").val("");
}


// frontend
$(document).ready(function(){
	$("form#playerOne").submit(function(event){
		event.preventDefault();
		playerOne = new Player(true);
		playerTwo = new Player(false);
		$(".startMenu").hide();
		$(".playerConsole").show();


		var playerOneName = $(".playerOneName").val();
		$("#playerOneName").text(playerOneName);

		var playerTwoName = $(".playerTwoName").val();
		$("#playerTwoName").text(playerTwoName);

		playerOne.playerName = playerOneName;
		playerTwo.playerName = playerTwoName;
	});

	$("button#newGame").click(function(event){
		$(".playerConsole").hide();
		clear();
		playerOne.newGame();
		playerTwo.newGame();
		$("#roundTotalOne").empty();
		$("#cumeScoreOne").empty();
		$("#dieROllOne").empty();
		$("#roundTotalTwo").empty();
		$("#cumeScoreTwo").empty();
		$("#diceRollTwo").empty();

		$(".startMenu").show();
	});

	$("button#playerOneRoll").click(function(event){
		playerOne.roll = rollDice();
		$("#diceRollOne").text(playerOne.roll);
		playerOne.rollOne();
		$("#roundTotalOne").text(playerOne.turnScore);
	});

	$("button#playerTwoRoll").click(function(event){
		playerTwo.roll = rollDice();
		$("#diceRollTwo").text(playerTwo.roll);
		playerTwo.rollOne();
		$("#roundTotalTwo").text(playerTwo.turnScore);
	});

	$("button#playerOneHold").click(function(event){
		playerOne.hold();
		$("#cumeScoreOne").text(playerOne.cumeScore);
		$("#roundTotalOne").empty();
		$("#diceRollOne").empty();
		playerOne.chickenDinner();
	});

	$("button#playerTwoHold").click(function(event){
		playerTwo.hold();
		$("#cumeScoreTwo").text(playerTwo.cumeScore);
		$("#roundTotalTwo").empty();
		$("diceRollTwo").empty();
		playerTwo.chickenDinner();
	});
});
