import { checkWinLose } from "./checkWinLose"
import { validateGuess } from './validation'


let dictionary = require('./dictionary.json')

export function submit(props, key, deleteButton){
    if (props.gameOver) return
    
    key = key === 'Backspace' ? deleteButton : key
    key = key === deleteButton ? key : key.toUpperCase();

    if (key === 'ENTER') {
        submitGuess(props)

    } else {
        props.setActiveTiles(
        updateActiveTiles(key, props.activeTiles, deleteButton)
        )
    }
}

function updateActiveTiles(key, activeTiles, deleteButton) {
    if (key.length === 1 && activeTiles.length < 5) {
        return activeTiles + key
    }

    if (key === deleteButton && activeTiles.length > 0) {
        return activeTiles.slice(0, activeTiles.length - 1)
    }

    //Ensures that a max of 5 letters are active
    return activeTiles.slice(0, 5)
}

function submitGuess(props) {
    
    if (props.activeTiles.length === 5) {
        if (!dictionary.includes(props.activeTiles.toLowerCase())) {
            props.alerts.push("Not in word list")
            props.setAlerts([...props.alerts])
            props.setShake(true)
            return
        }
        
        checkWinLose(props.activeTiles, 
            props.priorGuesses, 
            props.target, 
            props.gameOver,
            props.setGameOver, 
            props.setDance,
            props.setGameState)

        const submissionTileColors = validateGuess(props.activeTiles.toLowerCase(), props.target)
        props.setFlip(true)
        props.setTileColors(submissionTileColors)
        setTimeout(() => {         
            props.addGuess([...props.priorGuesses, {text: props.activeTiles.toLowerCase(), colors: submissionTileColors}])
            KeyColorsFromValidation(props.keyboardColors, props.setKeyboardColors, props.activeTiles, submissionTileColors)
            props.setActiveTiles("")
        }, 2000)
        
    }
    else{
        props.alerts.push("Not enough letters")
        props.setAlerts([...props.alerts])
        props.setShake(true)
    }
    
}

function KeyColorsFromValidation(keyboardColors, setKeyboardColors, guess, tileColors){
    if(!guess) return

    let colorDict = {...keyboardColors}

    const priorityDict = {
        "wrong": 0,
        "wrong-location": 1,
        "correct": 2
    }

    guess.split("").forEach((letter, index) => {
        // If the letter has not been guessed proir or is higher in the priorityDict, replace the color in the keyboard
        if (!colorDict[letter] || priorityDict[colorDict[letter]] < priorityDict[tileColors[index]] )
            colorDict[letter] = tileColors[index]
    })

    setKeyboardColors(colorDict)
}
    