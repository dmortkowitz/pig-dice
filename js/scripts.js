//backend
var playerOne="";
var playerTwo="";

var throw = function(){
	return Math.floor(6*Math.random())+1;
}

function Player(turn) {
	this.roll = 0;
	this.tempscore = 0;
	this.totalscore = 0;
	this.turn = turn; 
	this.playerName;
}

Player.prototype.rollOne = function(){
	if (this.roll === 1){
		this.tempscore = 0;
		alert("Sorry, " + this.playerName + ", but you rolled a 1! Your efforts have returned fruit like a barren land.")
	}else{
		this.tempscore += this.roll;
	}
}




//frontend
$(document).ready(function(){


	;})