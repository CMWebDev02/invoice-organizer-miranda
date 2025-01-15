import Stack from "react-bootstrap/esm/Stack"
import styles from './styles/UserSettingStyles.module.css'

export function NumberSetting({currentSetting, updateSetting, settingName, children}) {

    return (
        <Stack direction="horizontal" className={`w-100`}>
            <label htmlFor={settingName} className={`${styles.settingsLabel} w-75`}>{children}</label>
            <input id={settingName} className={`${styles.settingsInput} w-25`} type='number' min={1} max={50} value={currentSetting} onChange={(e) => updateSetting(settingName, e.target.value)} />
        </Stack>
    )
}