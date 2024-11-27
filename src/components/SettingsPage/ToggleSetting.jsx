export function ToggleSetting({ currentSetting, updateSetting, settingName, children }) {

    return (
        <div>
            <label>{children}</label>
            <button onClick={() => updateSetting(settingName, !currentSetting)}>{currentSetting ? 'On' : 'Off'}</button>
        </div>
    )
}