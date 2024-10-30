const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let playerHand = [];
let computerHand = [];
let gameOver = false;

function drawCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function calculateScore(hand) {
    let score = hand.reduce((a, b) => a + b, 0);
    if (score > 21 && hand.includes(11)) {
        hand[hand.indexOf(11)] = 1;
        score = hand.reduce((a, b) => a + b, 0);
    }
    return score;
}

function updateDisplay(handElement, hand, score) {
    const cardsContainer = handElement.querySelector(".cards");
    const scoreElement = handElement.querySelector(".score");
    
    cardsContainer.innerHTML = "";
    hand.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.textContent = card;
        cardsContainer.appendChild(cardDiv);
    });
    scoreElement.textContent = `Score: ${score}`;
}

function startGame() {
    playerHand = [drawCard(), drawCard()];
    computerHand = [drawCard()];
    gameOver = false;
    document.getElementById("game-status").textContent = "Game Started!";
    updateDisplay(document.getElementById("player-hand"), playerHand, calculateScore(playerHand));
    updateDisplay(document.getElementById("computer-hand"), computerHand, calculateScore(computerHand));
}

function hit() {
    if (!gameOver) {
        playerHand.push(drawCard());
        const playerScore = calculateScore(playerHand);
        updateDisplay(document.getElementById("player-hand"), playerHand, playerScore);
        if (playerScore > 21) {
            endGame("You went over. You lose!");
        }
    }
}

function stand() {
    if (!gameOver) {
        let playerScore = calculateScore(playerHand);
        let computerScore = calculateScore(computerHand);

        while (computerScore < 17) {
            computerHand.push(drawCard());
            computerScore = calculateScore(computerHand);
        }

        updateDisplay(document.getElementById("player-hand"), playerHand, playerScore);
        updateDisplay(document.getElementById("computer-hand"), computerHand, computerScore);

        if (computerScore > 21 || playerScore > computerScore) {
            endGame("You win!");
        } else if (playerScore < computerScore) {
            endGame("You lose!");
        } else {
            endGame("It's a draw!");
        }
    }
}

function endGame(message) {
    gameOver = true;
    document.getElementById("game-status").textContent = message;
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("hit-btn").addEventListener("click", hit);
document.getElementById("stand-btn").addEventListener("click", stand);
