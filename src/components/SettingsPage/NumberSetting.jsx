export function NumberSetting({currentSetting, updateSetting, settingName, children}) {

    return (
        <div>
            <label>{children}</label>
            <input type='number' min={1} max={50} value={currentSetting} onChange={(e) => updateSetting(settingName, e.target.value)} />
        </div>
    )
}