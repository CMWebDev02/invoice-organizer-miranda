import { useEffect, useState } from "react";
import { NumberSetting } from "../components/UserSettings/NumberSetting";
import { ToggleSetting } from "../components/UserSettings/ToggleSetting";

import { convertToSentence } from "../utilities/stringMutations";

import { UserSettingsStorage } from "../utilities/localStorage";
import { Link } from "react-router";

export function SettingsPage() {
    const [ userSettings, setUserSettings ] = useState(UserSettingsStorage.getStorage());
    const displaySettings = Object.entries(userSettings).map(([setting, settingValue]) => {
        return (typeof settingValue) == 'boolean' ?
            <ToggleSetting key={setting} currentSetting={userSettings[setting]} updateSetting={changeCurrentSetting} settingName={setting}>{convertToSentence(setting)}</ToggleSetting> :
            <NumberSetting key={setting} currentSetting={userSettings[setting]} updateSetting={changeCurrentSetting} settingName={setting}>{convertToSentence(setting)}</NumberSetting>  
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
        <>
            <div>{displaySettings}</div>
            <Link to='/'>Return</Link>
        </>
    )
}