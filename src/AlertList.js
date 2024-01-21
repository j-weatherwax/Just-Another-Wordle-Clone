export const AlertList = (props) => {
    const ArrayList = props.alerts.map((alert, key) => <Alert key={key} content={alert}/>)

    return (<div className="alert-container" data-alert-container="">
                {ArrayList}
            </div>)
}

const Alert = (props) => {
    return (
    <div className={`alert`}>
        {props.content}
    </div>)
}