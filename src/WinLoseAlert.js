export const WinLoseAlert = (props) => {
    return props.GameState ? 
        <div className="alert-container" data-alert-container="">
            <div className={`WinLoseAlert`}>
                {props.GameState}
            </div>
        </div>
    : ""
}