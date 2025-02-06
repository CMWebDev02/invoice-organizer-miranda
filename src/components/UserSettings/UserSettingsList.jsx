import { convertToTitle } from "../../utilities/stringMutations";
import { NumberSetting } from "./NumberSetting";
import { ToggleSetting } from './ToggleSetting'

/**
 * @component Maps through the userSettings object and depending on the setting type, renders an appropriate React Element to display on the page.
 * @returns {Array<React.JSX.Element>}
 */
export function UserSettingsList({userSettings, changeCurrentSetting}) {
    return Object.entries(userSettings).map(([setting, settingValue]) => {
        return typeof settingValue === "boolean" ? (
        <ToggleSetting
            key={setting}
            currentSetting={userSettings[setting]}
            updateSetting={changeCurrentSetting}
            settingName={setting}
        >
            {convertToTitle(setting)}
        </ToggleSetting>
        ) : (
        <NumberSetting
            key={setting}
            currentSetting={userSettings[setting]}
            updateSetting={changeCurrentSetting}
            settingName={setting}
        >
            {convertToTitle(setting)}
        </NumberSetting>
        );
    });
};