export function checkWinLose(guess, priorGuesses, target, alerts, setAlerts, gameOver, setGameOver, setDance) {
    if (!gameOver){
        //Checks win condition
        if (guess.toLowerCase() === target) {
            setGameOver(true)
            alerts.push("You Win")
            setAlerts([...alerts])
            setDance(true)
            return
        }
        //checks loss condition
        if (priorGuesses.length >= 5) {
            setGameOver(true)
            alerts.push(target.toUpperCase())
            setAlerts([...alerts])
            return
        }
    }
}