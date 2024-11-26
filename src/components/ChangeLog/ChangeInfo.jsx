export function ChangeInfo({ info, undoChange, isButtonDisabled }) {
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
            {isSuccessful && info.action != 'Undo Action' && <button onClick={() => undoChange(info.undoInfo, info.id, info.action)} disabled={isButtonDisabled}>Undo</button>}
        </div>
    )
}