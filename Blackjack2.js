function Deck() {
    var ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    var suits = [1,2,3,4];
    var deck = [];

	for (var s = 1; s <= suits.length; s++) {
        for (var r = 1; r <= ranks.length; r++) {
            deck.push(new Card(s, r));
        }
    }

    this.getDeck = function() {
    	return deck;
    }

    this.deal = function() {
    	return deck.shift();
    }

    this.shuffle = function(deck) {
        var currentIndex = deck.length, holder, rand;

        while (0 !== currentIndex) {

            rand = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            holder = deck[currentIndex];
            deck[currentIndex] = deck[rand];
            deck[rand] = holder;
        }

        return deck;

        }

    this.shuffle(deck);

}


function Card(suit, rank) {
    var suit = suit, rank = rank;
    this.getNumber = function() {
        return rank;
    }
    this.getSuit = function() {
        return suit;
    }
    this.getValue = function() {
        var value = this.getNumber();
        if (value == 11 || value == 12 || value == 13) {
            value = 10;
        } else if (value == 1) {
            value = 11;
        }
        return value;
        
    }
}

/* test cases to see if deck and cards are properly made,
and to see if deal shifts the deck properly:

var newDeck = new Deck();
console.log(newDeck.getDeck()[0].getNumber());
console.log(newDeck.getDeck()[1].getNumber());

var newCard = newDeck.deal();
console.log(newCard.getNumber());
*/


function Hand(deck) {
	var hand = [];
	hand[0] = deck.deal();
	this.getHand = function() {
		return hand;
	}

	this.hitMe = function(deck) {
		hand.push(deck.deal());
	};

	this.printHand = function() {
        var hand_string = "";
        var value, suit;
        for (var i = 0; i < hand.length; i++) {
            switch(hand[i].getNumber()) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                default:
                    value = hand[i].getNumber();
                    break;
                case 11:
                    value = "Jack";
                    break;
                case 12:
                    value = "Queen";
                    break;
                case 13:
                    value = "King";
                    break;
                case 1:
                    value = "Ace";
                    break;

            };
            switch(hand[i].getSuit()) {
                case 1:
                    suit = "Diamonds";
                    break;
                case 2:
                    suit = "Clubs";
                    break;
                case 3:
                    suit = "Hearts";
                    break;
                case 4:
                    suit = "Spades";
                    break;
            }

            hand_string += value +
            " of " + suit + ", ";
        }
        return hand_string;
    }
	this.score = function() {
        var score = 0;
        for (var i = 0; i < hand.length; i++) 
            if (hand[i].getValue() == 11 &&
                score + hand[i].getValue() == 21) {
                return score = 21;
            } else if (hand[i].getValue() == 11 &&
                        score + hand[i].getValue() > 21) {
                return score += 1;
            } else {
                score += hand[i].getValue();
                }
        return score;
    }

}

/* test cases to see if Hand properly
gets its faceDownCard:

var newHand = new Hand(newDeck);
console.log(newHand.getCard().getNumber());

*/



function playAsDealer(deck) {
    var dealerHand = new Hand(deck);
    while (dealerHand.score() < 17) {
        dealerHand.hitMe(deck);
    }
    return dealerHand;
}

function playAsUser(deck) {
    var userHand = new Hand(deck);
    var decision = confirm(userHand.printHand() + "for a score of " + userHand.score() + "." + " Press OK to hit, press cancel to stay");
    while (decision) {
        userHand.hitMe(deck);
        decision = confirm(userHand.printHand() + "for a score of " + userHand.score() + "." + " Press OK to hit, press cancel to stay");
    }
    return userHand;
}

function declareWinner(userHand, dealerHand) {
    if (userHand.score() > 21) {
        return console.log("You lose!");
    } else if (dealerHand.score() > 21) {
        return console.log("You win!");
    } else if (userHand.score() > dealerHand.score()) {
        return console.log("You win!");
    } else {
        return console.log("You lose!");
    }
}

function playGame() {
	var newDeck = new Deck();
    var user = playAsUser(newDeck);
    var dealer = playAsDealer(newDeck);
    declareWinner(user, dealer);
}

playGame();
