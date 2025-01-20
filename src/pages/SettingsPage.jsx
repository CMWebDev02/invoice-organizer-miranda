import { useEffect, useState } from "react";
import { NumberSetting } from "../components/UserSettings/NumberSetting";
import { ToggleSetting } from "../components/UserSettings/ToggleSetting";
import Stack from "react-bootstrap/esm/Stack";

import { convertToTitle } from "../utilities/stringMutations";

import { UserSettingsStorage } from "../utilities/localStorage";
import { Link, useLocation } from "react-router";

import styles from "./styles/SettingsPage.module.css";

/**
 * @component Renders the settings page which houses the logic to allow the user to altering and updating their settings.
 * @returns {ReactElement}
 */
export function SettingsPage() {
  //? Retrieves any state passed through when routing to this page.
  const userLocation = useLocation();
  const locationState = userLocation.state;
  //? Checks if any the passed in state is not null, if not, the lastLocation property is set as the returnLink, else the user is redirected back to the home page.
  const returnLink =
    locationState !== null ? `/${locationState.lastLocation}` : "/";

  const [userSettings, setUserSettings] = useState(
    UserSettingsStorage.getStorage()
  );

  /**
   * Any time the userSettings object updates, the change is updated in localStorage as well.
   */
  useEffect(() => {
    if (userSettings) UserSettingsStorage.setStorage(userSettings);
  }, [userSettings]);

  /**
   * @function
   * @param {string} settingName - Name of the setting, or the key, that will be used to update its associated value.
   * @param {number | boolean} newValue - The new value of the setting that will be updated.
   * @returns {void}
   */
  function changeCurrentSetting(settingName, newValue) {
    setUserSettings((prevUserSettings) => {
      return {
        ...prevUserSettings,
        [settingName]: newValue,
      };
    });
  }

  /**
   * @component Maps through the userSettings object and depending on the setting type, renders an appropriate React Element to display on the page.
   * @returns {Array<ReactElement>}
   */
  const RenderUserSettings = () => {
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

  return (
    <Stack gap={2} className={`p-1 w-100 h-100`}>
      <Stack direction="horizontal" className={`${styles.header} p-1`}>
        <h1>Settings</h1>
        <Link to={returnLink} className="ms-auto interfaceButton">
          Return
        </Link>
      </Stack>
      <Stack className={`${styles.settingsContainer} p-1 w-50 mx-auto`} gap={2}>
        <RenderUserSettings />
      </Stack>
    </Stack>
  );
}
