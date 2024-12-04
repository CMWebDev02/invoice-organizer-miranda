import { useEffect, useState } from "react";
import { NumberSetting } from "../components/UserSettings/NumberSetting";
import { ToggleSetting } from "../components/UserSettings/ToggleSetting";

import { UserSettingsStorage } from "../utilities/localStorage";

export function SettingsPage() {
    const [ userSettings, setUserSettings ] = useState(UserSettingsStorage.getStorage());

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
        <div>
            <NumberSetting currentSetting={userSettings.CHANGELOG_ACTIONS} updateSetting={changeCurrentSetting} settingName={'CHANGELOG_ACTIONS'}>
                Maximum ChangeLog Actions:</NumberSetting>
            <ToggleSetting currentSetting={userSettings.SHOW_QUICK_TRANSFER_BUTTONS} updateSetting={changeCurrentSetting} settingName={'SHOW_QUICK_TRANSFER_BUTTONS'}>
                Show Quick Transfer Buttons</ToggleSetting>
            <ToggleSetting currentSetting={userSettings.SHOW_QUICK_UNDO_BUTTONS} updateSetting={changeCurrentSetting} settingName={'SHOW_QUICK_UNDO_BUTTONS'}>
                Show Undo Buttons</ToggleSetting>
        </div>
    )
}