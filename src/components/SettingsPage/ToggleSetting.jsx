export function ToggleSetting({ changeCurrentSetting, currentSetting, children }) {

    return (
        <div>
            <label>{children}</label>
            <button onClick={() => changeCurrentSetting(!currentSetting)}>{currentSetting ? 'On' : 'Off'}</button>
        </div>
    )
}