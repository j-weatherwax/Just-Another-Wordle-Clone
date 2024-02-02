import { useEffect, useMemo } from 'react'
import { submit } from './submit'

export const Keyboard = (props) => {

    
    const deleteButton = useMemo(() => (
        <svg key="delete" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      ), [])

    //Allows user to type answer using their keyboard instead of having to use the on-screen buttons
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (props.gameOver) return

            if (props.setActiveTiles) {
                submit(props, event.key, deleteButton)
            }
        }
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [props, deleteButton])

    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        null, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', null, 
        'Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', deleteButton
      ];
    
    return (
        <div data-keyboard className="keyboard">
            {keys.map((key, index) => (
                key === null ? <div key={index} className="space"></div>
                :
                <button 
                    key={index} 
                    className={`key ${props.keyboardColors[key]} ${key === 'Enter' || key === deleteButton ? 'large' : ''}`}
                    {...(key.length === 1 && { 'data-key': key })}
                    {...(key === 'Enter' && { 'data-enter': '' })}
                    {...(key === deleteButton && { 'data-delete': '' })} 
                    onClick = {() =>
                        submit(props, key, deleteButton)
                    }
                    >
                {key}
                </button>
            ))}
        </div>
    )
}    