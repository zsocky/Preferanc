const value = [1, 2, 3, 4, 5, 6, 7, 8];
const suits = ["zold", "sarga", "piros", "makk"];
class Card {
	constructor(value, suits) {
		this.suit = suits;
		this.value = value;
		this.name = String(suits + value);
	}
}

//create deck and player cards
const deck = new Array();
const player1 = new Array();
const player2 = new Array();
const player3 = new Array();
const talon = new Array();

//player and talon clicked button for switch
let parentid;

//switch cards
let localCard = new Card();
let localTalon;

//for clicked button
let index_talon;
let index_button;

//contor for licit
let passContor = 0;
let raiseContor = 0;
let playContor = 0;

//contor played card
let playedCard = 0;

//for pup up
let myPopup = document.querySelector(".popup-box");
var h2 = document.querySelector("h2");

function getDeck() {
	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < value.length; x++) {
			let card = new Card(value[x], suits[i]);
			deck.push(card);
		}
	}
	return deck;
}

function loadImg() {
	var buttons = document.getElementById("player_one_deck").getElementsByTagName("button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = "<img src=\"../images/kartyak/" + player1[i].name + ".jpg\"/>";
	}

	var buttons = document.getElementById("player_two_deck").getElementsByTagName("button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = "<img src=\"../images/kartyak/" + player2[i].name + ".jpg\"/>";
	}

	var buttons = document.getElementById("player_three_deck").getElementsByTagName("button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = "<img src=\"../images/kartyak/" + player3[i].name + ".jpg\"/>";
	}

	var buttons = document.getElementById("talon_card").getElementsByTagName("button");
	for (let i = 0; i < buttons.length; i++) {
		if (((raiseContor > 0) && (passContor == 2)) || (raiseContor == 9)) {
			buttons[i].innerHTML = "<img src=\"../images/kartyak/" + talon[i].name + ".jpg\"/>";
			jQuery('.auction_bar').hide();
			jQuery('#game_mode').show();
			gameMode();
			// cardOnTable();
			var list = document.querySelector('ul');
			var count = list.childElementCount;
			for (var x = 0; x < count; x++) {
				if (x < 2) {
					list.lastElementChild.style.display = 'none';
					clickTalon();
					clickedPlayer();
				}
				if (x < raiseContor - 2) {
					list.children[x].style.display = 'none';
					list.lastElementChild.style.display = 'none';
					clickTalon();
					clickedPlayer();
				}
			}
		} else if (passContor == 3) {
			buttons[0].innerHTML = "<img src=\"../images/kartyak/" + talon[0].name + ".jpg\"/>";
			myPopup.style.display = "flex";
			myPopup.lastElementChild.innerHTML = 'Korpass';
			h2.innerHTML = 'Korpass';
			h2.style.fontSize = '3em';
			setTimeout(() => {
				myPopup.style.display = "none";
			}, 5000);
			jQuery('.auction_bar').hide();
			jQuery('#played_deck').show();
			cardOnTable()
			if (playedCard == 1) {
				buttons[1].innerHTML = "<img src=\"../images/kartyak/" + talon[1].name + ".jpg\"/>";
			}
		} else if (playContor == 1) {
			jQuery('#preferanc').css.display = 'block';
			jQuery('.auction_bar').hide();
			jQuery('#game_mode').show();
			gameMode();
			cardOnTable();
			buttons[i].innerHTML = "<img src=\"../images/bckg_cards/bg_card_2.jpg\"/>";
			//this.box_player auction_bar display none;
		} else {
			buttons[i].innerHTML = "<img src=\"../images/bckg_cards/bg_card_2.jpg\"/>";
		}
	}
}

function getplayers() {
	for (let i = 0; i < 10; i++) {
		player1.push(deck[i]);
		player1.sort((a, b) => (a.suit > b.suit) ? 1 : (a.suit === b.suit) ? ((a.value > b.value) ? 1 : -1) : -1)
	}
	for (let i = 10; i < 20; i++) {
		player2.push(deck[i]);
		player2.sort((a, b) => (a.suit > b.suit) ? 1 : (a.suit === b.suit) ? ((a.value > b.value) ? 1 : -1) : -1)
	}
	for (let i = 20; i < 30; i++) {
		player3.push(deck[i]);
		player3.sort((a, b) => (a.suit > b.suit) ? 1 : (a.suit === b.suit) ? ((a.value > b.value) ? 1 : -1) : -1)
	}
	for (let i = 30; i < 32; i++) {
		talon.push(deck[i]);
		talon.sort((a, b) => (a.suit > b.suit) ? 1 : (a.suit === b.suit) ? ((a.value > b.value) ? 1 : -1) : -1)
	}
}

function shuffle(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * i);
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	getplayers();
	loadImg();
}

function licit() {
	var pass = document.querySelector('.pass');
	pass.addEventListener('click', function (event) {
		event.preventDefault();
		//database required;
		passContor++;
		loadImg();
	});
	var raise = document.querySelector('.raise');
	raise.addEventListener('click', function (event) {
		event.preventDefault();
		raiseContor++;
		loadImg();
	});
	var play = document.querySelector('.play');
	play.addEventListener('click', function (event) {
		event.preventDefault();
		playContor++;
		loadImg();
	});
}
licit();

function cardOnTable() {
	// call this function to show click counts!
	var clickP1Button = jQuery('#player_one_deck button');
	clickP1Button.one('click', function () {
		playedCard++;
		document.querySelector('#played_deck').appendChild(this);
		clickP1Button.off('click');
	})
	var clickP2Button = jQuery('#player_two_deck button');
	clickP2Button.one('click', function () {
		playedCard++;
		document.querySelector('#played_deck').appendChild(this);
		clickP2Button.off('click');
	})
	var clickP3Button = jQuery('#player_three_deck button');
	clickP3Button.one('click', function () {
		playedCard++;
		document.querySelector('#played_deck').appendChild(this);
		clickP3Button.off('click');
	})
}

function clickTalon() {
	var talonCardOne = document.querySelector('#one');
	talonCardOne.addEventListener('dblclick', function (event) {
		talonCardOne.disable = true;
		event.preventDefault();
		localTalon = this.innerHTML;
		this.innerHTML = "<img src=\"../images/bckg_cards/bg_card_2.png\"/>";
		document.getElementById(parentid).innerHTML = "<img src=\"../images/kartyak/" + talon[0].name + ".jpg\"/>";
	}, {
		once: true
	});
	var talonCardTwo = document.querySelector('#two');
	talonCardTwo.addEventListener('dblclick', function (event) {
		event.preventDefault();
		localTalon = this.innerHTML;
		this.innerHTML = "<img src=\"../images/bckg_cards/bg_card_2.png\"/>";
		document.getElementById(parentid).innerHTML = "<img src=\"../images/kartyak/" + talon[1].name + ".jpg\"/>";
	}, {
		once: true
	});
}

function clickedPlayer() {
	var g = document.getElementById('player_one_deck');
	for (var i = 0, len = g.children.length; i < len; i++) {
		(function () {
			g.children[i].onclick = function () {
				parentid = this.id;
				document.getElementById("one").disabled = false;
				document.getElementById("two").disabled = false;
			}
		})(i);
	}
	var g = document.getElementById('player_two_deck');
	for (var i = 0, len = g.children.length; i < len; i++) {
		(function () {
			g.children[i].onclick = function () {
				parentid = this.id;
				document.getElementById("one").disabled = false;
				document.getElementById("two").disabled = false;
			}
		})(i);
	}
	var g = document.getElementById('player_three_deck');
	for (var i = 0, len = g.children.length; i < len; i++) {
		(function () {
			g.children[i].onclick = function () {
				parentid = this.id;
				document.getElementById("one").disabled = false;
				document.getElementById("two").disabled = false;
			}
		})(i);
	}
}

function gameMode() {
	jQuery('li').click(function () {
		document.getElementById("talon_card").style.visibility = "hidden";
		myPopup.style.display = "block";
		myPopup.lastElementChild.innerHTML = ($(this).html());
		h2.innerHTML = ($(this).html());
		h2.style.fontSize = '3em';
		h2.style.marginBottom = '0';
		$('.dropdown').hide();
		jQuery('#played_deck').show();
		setTimeout(() => {
			myPopup.style.display = "none";
		}, 5000);
	})
}



window.onload = function () {
	getDeck();
	shuffle(deck);
	jQuery('#game_mode').hide();
	jQuery('#played_deck').hide()
	$(".loader-wrapper").fadeOut(4500);
}