import { useEffect, useState } from "react";
import { NumberSetting } from "../components/UserSettings/NumberSetting";
import { ToggleSetting } from "../components/UserSettings/ToggleSetting";
import Stack from "react-bootstrap/esm/Stack";

import { convertToTitle } from "../utilities/stringMutations";

import { UserSettingsStorage } from "../utilities/localStorage";
import { Link } from "react-router";

import styles from './styles/SettingsPage.module.css'

export function SettingsPage() {
    const [ userSettings, setUserSettings ] = useState(UserSettingsStorage.getStorage());
    const displaySettings = Object.entries(userSettings).map(([setting, settingValue]) => {
        return (typeof settingValue) === 'boolean' ?
            <ToggleSetting key={setting} currentSetting={userSettings[setting]} updateSetting={changeCurrentSetting} settingName={setting}>{convertToTitle(setting)}</ToggleSetting> :
            <NumberSetting key={setting} currentSetting={userSettings[setting]} updateSetting={changeCurrentSetting} settingName={setting}>{convertToTitle(setting)}</NumberSetting>  
    })

    useEffect(() => {
        if (userSettings) UserSettingsStorage.setStorage(userSettings);
    }, [userSettings])

    function changeCurrentSetting(settingName, newValue) {
        setUserSettings(prevUserSettings => {
            return {
                ...prevUserSettings,
                [settingName]: newValue
            }
        })
    }

    return (
        <Stack gap={2} className={`p-1 w-100 h-100`}>
            <Stack direction="horizontal" className={`${styles.header} p-1`}>
                <h1>Settings</h1>
                {/* Have this link to the home page or the last page the user was on */}
                <Link to='/' className="ms-auto interfaceButton">Return</Link>
            </Stack>
            <Stack className={`${styles.settingsContainer} p-1 w-50 mx-auto`} gap={2}>
                {displaySettings}
            </Stack>
        </Stack>
    )
}