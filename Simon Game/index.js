var gamePattern = [];
var bottonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var userClickedPattern = [];
var start = false;

$(document).keypress(function() {
  if(!start){
  $("#level-title").text("Level " + level);
  nextSequence();
  start = true;
 }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  while ( userClickedPattern.length == gamePattern.length && checkAnswer(userClickedPattern.length-1)) {
    nextSequence();
  }

  if (!checkAnswer(userClickedPattern.length -1)) {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
});

function nextSequence() {
   userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = bottonColor[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
    return true;
  } else {
    return false;
  }
}
function startOver(){
  $("#level-title").text("Press A Key to Start");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = false;
}
