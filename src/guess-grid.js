import { CSSTransition } from 'react-transition-group'
const FLIP_ANIMATION_DURATION = 500

export const GuessGrid = (props) => {
    var flipArray= [true, true, true, true, true]

    if (props.flip) {
        setTimeout(() => props.setFlip(false), FLIP_ANIMATION_DURATION*3)
    }

    return (
        <div data-guess-grid className="guess-grid">
            {props.priorGuesses.map((guess, index) => renderPrev(guess, index))}
            {props.activeTiles.split('').map((letter,index) => <Tile 
                                                                key={index+50}
                                                                index={index}
                                                                letter={letter} 
                                                                shake={props.shake} 
                                                                active={true} 
                                                                color={props.tileColors ? props.tileColors[index] : ""} 
                                                                flip={props.flip ? flipArray[index] : false} 
                                                                setShake={props.setShake}/>)}
            {emptyTiles(props)}
            {flipArray = []}
        </div>
    )
} 

const Tile = (props) => <CSSTransition in={props.flip} timeout={((props.index)*FLIP_ANIMATION_DURATION)/2} classNames={`${props.color}`}>
                            <CSSTransition in={props.shake} timeout={250} classNames={"shake"} onEntered={() => props.setShake(false)}>
                                <div className={`tile ${props.shake ? "shake" : ""} ${props.active ? "active" : props.color}`}>
                                    {props.letter}
                                </div>
                            </CSSTransition>
                        </CSSTransition>
                        

const renderPrev = (guess, guessIndex) => {
    return guess.text.split('').map((letter, letterIndex) => (<Tile key={letterIndex} letter={letter} shake={false} active={false} color={guess.colors[letterIndex]} setShake={() => {}}/>))
}

function emptyTiles(props) {
    let grid = []
    for (let i = 0; i < 30-props.priorGuesses.length * 5 - props.activeTiles.length; i++) {
        grid.push(<Tile key={i+100} shake={i < 5-props.activeTiles.length ? props.shake : false} active={false} color={null} setShake={() => {}}/>)
    }
    return grid
}