export function NumberSetting({currentSetting, children}) {

    return (
        <div>
            <label>{children}</label>
            <input type='number' min={1} max={50} value={currentSetting}/>
        </div>
    )
}