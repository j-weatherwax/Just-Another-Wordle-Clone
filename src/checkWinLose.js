export function checkWinLose(guess, priorGuesses, target, gameOver, setGameOver, setDance, setGameState) {
    if (!gameOver){
        //Checks win condition
        if (guess.toLowerCase() === target) {
            setGameOver(true)
            setGameState("You Win")
            setDance(true)
            return
        }
        //checks loss condition
        if (priorGuesses.length >= 5) {
            setGameOver(true)
            setGameState(target.toUpperCase())
            return
        }
    }
}