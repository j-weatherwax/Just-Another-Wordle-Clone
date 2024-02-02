import logo from './logo.svg'
import { useState } from 'react'
import { GuessGrid } from './guess-grid'
import { Keyboard } from './keyboard'
import { AlertList } from './AlertList'
import { WinLoseAlert } from './WinLoseAlert'
import './styles.css';

// let targetWords = require('./targetWords.json')
const target = "grass"//targetWords[Math.floor(Math.random() * targetWords.length)]


function App() {

    const [activeTiles, setActiveTiles] = useState("")
    const [priorGuesses, addGuess] = useState([])
    const [tileColors, setTileColors] = useState([])
    let [alerts, setAlerts] = useState([])
    const [shake, setShake] = useState(false)
    const [flip, setFlip] = useState(false)
    const [dance, setDance] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [GameState, setGameState] = useState(null)
    const [keyboardColors, setKeyboardColors] = useState({})

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <AlertList alerts={alerts} setAlerts={setAlerts}/>
            <WinLoseAlert GameState = {GameState}/>
            <GuessGrid activeTiles={activeTiles} 
                    priorGuesses={priorGuesses} 
                    addGuess={addGuess}
                    shake={shake}
                    setShake={setShake}
                    dance={dance}
                    setDance={setDance}
                    tileColors={tileColors}
                    flip={flip}
                    setFlip={setFlip}
                    alerts={alerts} 
                    setAlerts={setAlerts}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    target={target}/>
            <Keyboard activeTiles={activeTiles} 
                    setActiveTiles={setActiveTiles} 
                    priorGuesses={priorGuesses} 
                    addGuess={addGuess}
                    tileColors={tileColors}
                    setTileColors={setTileColors}
                    alerts={alerts} 
                    setAlerts={setAlerts}
                    setShake={setShake}
                    setFlip={setFlip}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                    setDance={setDance}
                    keyboardColors={keyboardColors}
                    setKeyboardColors={setKeyboardColors}
                    setGameState={setGameState}
                    target={target}/>
        </div>
    );
}

export default App;