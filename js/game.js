const numDivs = 36;
const maxHits = 10;

let hits = 0;
let mistakes = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".game-field").removeClass('target');
  let divSelector = randomDivId();
  $(divSelector).removeClass("miss");
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(".target").text(`${hits+1}`);
  // FIXME: тут надо определять при первом клике firstHitTime
	if (hits === 0){firstHitTime = getTimestamp();}
  	if (hits + mistakes === maxHits) {
    	endGame();
  	}
}

function setSquareVerbose(numHits){
	if(hits === 1){
  		return "зеленый квадрат"
  } else if (hits === 2){
  		return "зеленых квадрата"
  } else {
  	return "зеленых квадратов"
  }
}


function verboseMistakes(mistakes){
	if (mistakes === 0){
		$("#mistakes-message").text("Потрясающе! Без единой ошибки! Медальку Вам");
		$("#mistakes-message").addClass("great-job");
	} else if (mistakes === 1){
		$("#mistakes-message").text("Одна ошибка. Случайно промазали.");
	} else if (mistakes === 2){
		$("#mistakes-message").text("Две ошибки ... Бывает.");
	} else if((mistakes === 3) |(mistakes === 4) ){
		$("#mistakes-message").text(`${mistakes} ошибки ... У вас был трудный день. Попробуйте еще.`);
	}else{
		$("#mistakes-message").text(`${mistakes} ошибок. Вы прикалываетесь?!?!?!`);
		$("#mistakes-message").addClass("angry");
	}
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".grid-wrapper").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#num-squares").text(hits);

  $("#square-verbose").text(setSquareVerbose(hits))
  verboseMistakes(mistakes);

  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".target").text("");
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
  }else {
  	$(event.target).addClass("miss");
  	mistakes += 1;
  }
    round();
  }


function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
