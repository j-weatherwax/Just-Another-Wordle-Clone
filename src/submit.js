import { checkWinLose } from "./checkWinLose"
import { validateGuess } from './validation'


let dictionary = require('./dictionary.json')

export function submit(props, key, deleteButton){
    if (props.gameOver) return
    
    if (key.toUpperCase() === 'ENTER') {
        props.setTileColors(
            submitGuess(props.activeTiles, 
                        props.target, 
                        props.priorGuesses,
                        props.addGuess,
                        props.setActiveTiles,
                        props.setTileColors,
                        props.alerts, 
                        props.setAlerts, 
                        props.setShake,
                        props.setFlip)
        )
        checkWinLose(props.activeTiles, 
            props.priorGuesses, 
            props.target, 
            props.alerts, 
            props.setAlerts, 
            props.gameOver,
            props.setGameOver, 
            props.setDance)
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

function submitGuess(tiles, target, priorGuesses, addGuess, setActiveTiles, setTileColors, alerts, setAlerts, setShake, setFlip) {
    
    if (tiles.length === 5) {
        if (!dictionary.includes(tiles.toLowerCase())) {
            alerts.push("Not in word list")
            setAlerts([...alerts])
            setShake(true)
            return ""
        }

        const submissionTileColors = validateGuess(tiles.toLowerCase(), target)
        setFlip(true)
        setTimeout(() => {         
            addGuess([...priorGuesses, {text: tiles.toLowerCase(), colors: submissionTileColors}])
            setActiveTiles("")
            setTileColors([])
        }, 2000)
        return submissionTileColors
    }
    
    alerts.push("Not enough letters")
    setAlerts([...alerts])
    setShake(true)
    return ""
}