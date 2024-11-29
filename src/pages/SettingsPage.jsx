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
            <NumberSetting currentSetting={userSettings.changeLogActions} updateSetting={changeCurrentSetting} settingName={'changeLogActions'}>
                Maximum ChangeLog Actions:</NumberSetting>
            <ToggleSetting currentSetting={userSettings.showQuickTransferButtons} updateSetting={changeCurrentSetting} settingName={'showQuickTransferButtons'}>
                Show Quick Transfer Buttons</ToggleSetting>
            <ToggleSetting currentSetting={userSettings.showUndoButtons} updateSetting={changeCurrentSetting} settingName={'showUndoButtons'}>
                Show Undo Buttons</ToggleSetting>
        </div>
    )
}