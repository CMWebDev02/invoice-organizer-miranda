import { useState } from "react";
import { NumberSetting } from "../components/SettingsPage/NumberSetting";

export function SettingsPage() {
    const [ userSettings, setUserSettings ] = useState({});

    return (
        <div>
            <NumberSetting currentSetting={3}>Maximum ChangeLog Actions:</NumberSetting>
        </div>
    )
}