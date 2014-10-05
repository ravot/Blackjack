    // Card Constructor
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

function deal(cardsToDeal) {
    if (cardsToDeal == 0) {
        return;        
    } else {
        var suit = Math.floor(Math.random() * 4 + 1);
        var rank = Math.floor(Math.random() * 13 + 1);
        var result = new Card(suit, rank);
        return result;
    }
    
}

function Hand() {
    var fingers = [];
    fingers[0] = deal();
    fingers[1] = deal();
    
    this.getHand = function() {
        return fingers;
    }
    
    this.score = function() {
        var score = 0;
        for (var i = 0; i < fingers.length; i++) 
            if (fingers[i].getValue() == 11 &&
                score + fingers[i].getValue() == 21) {
                return score = 21;
            } else if (fingers[i].getValue() == 11 &&
                        score + fingers[i].getValue() > 21) {
                return score += 1;
            } else {
                score += fingers[i].getValue();
                }
        return score;
    }
    
    this.printHand = function() {
        var hand_string = "";
        var value, suit;
        for (var i = 0; i < fingers.length; i++) {
            switch(fingers[i].getNumber()) {
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
                    value = fingers[i].getNumber();
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
            switch(fingers[i].getSuit()) {
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
    
    this.hitMe = function() {
        var newCard = deal();
        fingers.push(newCard);
    }
}

function playAsDealer() {
    var dealerHand = new Hand();
    while (dealerHand.score() < 17) {
        dealerHand.hitMe();
    }
    return dealerHand;
}

function playAsUser() {
    var userHand = new Hand();
    var decision = confirm(userHand.printHand() + "for a score of " + userHand.score() + "." + " Press OK to hit, press cancel to stay");
    while (decision) {
        userHand.hitMe();
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
    var user = playAsUser();
    var dealer = playAsDealer();
    declareWinner(user, dealer);
}
playGame();