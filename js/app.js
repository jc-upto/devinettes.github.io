function Game(gameInput) {
    let number = Math.ceil(Math.random() * 100) + 1;
    let attempts = 10;
    let attemptsRecords = [];
    let testEvent = new CustomEvent("onNumberTested");

    /**
     * Return all tried numbers as string.
     */
    this.getAttempts = function() {
        return attemptsRecords.join(" , ");
    };

    /**
     * Return how many time the player tried to find the number.
     * @returns int
     */
    this.getAttemptsLeft = function() {
        return attempts;
    };

    /**
     * Test the current number and dispatch event.
     */
    this.test = function() {
        if (attempts === 0){
            testEvent.message = "Nombre d'essais dépassé, vous avez perdu.";
        }
        else if (new RegExp('^\\d+$').test(gameInput.value) && parseInt(gameInput.value) <= 100) {
            attemptsRecords.push(gameInput.value);
            attempts--;

            if(parseInt(gameInput.value) < number) {
                testEvent.message = "Votre nombre est plus petit.";
            }
            else if(parseInt(gameInput.value) > number) {
                testEvent.message = "Votre nombre est plus grand.";
            }
            else {
                testEvent.message = "Félicitations, vous avez trouvé le numéro mystère.";
            }
        }
        else {
            testEvent.message = "Un nombre compris entre 1 et 100 est requis.";
        }
        document.body.dispatchEvent(testEvent);
    };
}

// Start the game.
function startNewGame() {
    let game;

    for(let div of document.getElementsByClassName("messages"))
        div.innerHTML = "";

    game = new Game(document.getElementById("try"));

    document.body.addEventListener("onNumberTested", function(event) {
        document.getElementById("attemptsDiv").innerHTML = game.getAttempts();
        document.getElementById("game-left").innerHTML = "Il vous reste " + game.getAttemptsLeft() + " chances";
        document.getElementById("messages").innerHTML = event.message;
    });

    document.getElementById("try-button").addEventListener("click", game.test);
}

startNewGame();
document.getElementById("generate").addEventListener("click", startNewGame);