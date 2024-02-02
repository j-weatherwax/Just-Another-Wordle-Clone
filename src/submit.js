import { checkWinLose } from "./checkWinLose"
import { validateGuess } from './validation'


let dictionary = require('./dictionary.json')

export function submit(props, key, deleteButton){
    if (props.gameOver) return
    
    key = key === 'Backspace' ? deleteButton : key
    key = key === deleteButton ? key : key.toUpperCase();

    if (key === 'ENTER') {
        submitGuess(props.activeTiles, 
            props.target, 
            props.priorGuesses,
            props.addGuess,
            props.activeTiles,
            props.setActiveTiles,
            props.tileColors,
            props.setTileColors,
            props.keyboardColors,
            props.setKeyboardColors,
            props.alerts, 
            props.setAlerts, 
            props.setShake,
            props.setFlip)

        checkWinLose(props.activeTiles, 
            props.priorGuesses, 
            props.target, 
            props.gameOver,
            props.setGameOver, 
            props.setDance,
            props.setGameState)
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

function submitGuess(tiles, target, priorGuesses, addGuess, activeTiles, setActiveTiles, tileColors, setTileColors, keyboardColors, setKeyboardColors, alerts, setAlerts, setShake, setFlip) {
    
    if (tiles.length === 5) {
        if (!dictionary.includes(tiles.toLowerCase())) {
            alerts.push("Not in word list")
            setAlerts([...alerts])
            setShake(true)
            return
        }

        const submissionTileColors = validateGuess(tiles.toLowerCase(), target)
        setFlip(true)
        setTileColors(submissionTileColors)
        setTimeout(() => {         
            addGuess([...priorGuesses, {text: tiles.toLowerCase(), colors: submissionTileColors}])
            KeyColorsFromValidation(keyboardColors, setKeyboardColors, activeTiles, submissionTileColors)
            setActiveTiles("")
        }, 2000)
        
    }
    else{
        alerts.push("Not enough letters")
        setAlerts([...alerts])
        setShake(true)
    }
    
}

function KeyColorsFromValidation(keyboardColors, setKeyboardColors, guess, tileColors){
    if(!guess) return

    let colorDict = {...keyboardColors}

    console.log(tileColors)

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
    