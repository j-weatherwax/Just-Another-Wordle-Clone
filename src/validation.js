export function validateGuess(guess, target) {
    let targetCopy = target
    let stateList = ["","","","",""]

    guess.split("").forEach((letter, index) => {
        if (letter === target[index]) {
            stateList[index]= "correct"
            targetCopy=targetCopy.replace(letter, "")
        }
    })
    guess.split("").forEach((letter, index) => {
        if (targetCopy.includes(letter)) {
            stateList[index]="wrong-location"
            targetCopy=targetCopy.replace(letter, "")
        } else if (stateList[index].length === 0) {
            stateList[index] = "wrong"
        }
    })

    return stateList
}