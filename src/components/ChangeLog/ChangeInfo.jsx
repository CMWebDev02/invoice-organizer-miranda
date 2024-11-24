export function ChangeInfo({ info }) {
    let isSuccessful = info.result == 'Succeeded' ? true : false;

    let tempSuccessfulStyle = {
        color: 'green'
    }
    
    let tempFailedStyle = {
        color: 'red'
    }

    function undoChange() {
        let userResult = confirm('Are You Sure You Want to Undo This Change?')
        if (!userResult) return;
        console.log('not yet')
    }

    return (
        <div style={isSuccessful ? tempSuccessfulStyle : tempFailedStyle}>
            {info.message}
            <button onClick={undoChange}>Undo</button>
        </div>
    )
}