export function ChangeInfo({ info, undoChange }) {
    let isSuccessful = info.result == 'Succeeded' ? true : false;

    let tempSuccessfulStyle = {
        color: 'green'
    }
    
    let tempFailedStyle = {
        color: 'red'
    }

    return (
        <div style={isSuccessful ? tempSuccessfulStyle : tempFailedStyle}>
            {info.message}
            {isSuccessful && <button onClick={() => undoChange(info.undoInfo, info.id, info.action)}>Undo</button>}
        </div>
    )
}