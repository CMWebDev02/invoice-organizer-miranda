import Stack from "react-bootstrap/esm/Stack";
import styles from "./styles/UserSettingStyles.module.css";

/**
 * @component Renders a user setting with a label and a toggle button.
 * @param {boolean} currentSetting - Current snapshot value of the setting.
 * @param {Function} updateSetting - Function used to update the current setting.
 * @param {Function} settingName - Name of the setting.
 * @param {ReactNode} children - Node elements wrapped within the component.
 * @returns {React.JSX.Element}
 */
export function ToggleSetting({
  currentSetting,
  updateSetting,
  settingName,
  children,
}) {
  /**
   * @component Renders a setting label and button for toggling the setting's value.
   * @returns {React.JSX.Element}
   */
  const RenderToggleButton = () => {
    return (
      <button
        id={settingName}
        className={`${styles.settingsToggleInput} w-25 interfaceButton`}
        onClick={() => updateSetting(settingName, !currentSetting)}
      >
        {currentSetting ? "On" : "Off"}
      </button>
    );
  };

  return (
    <Stack direction="horizontal" className={`w-100`}>
      <label htmlFor={settingName} className={`${styles.settingsLabel} w-75`}>
        {children}
      </label>
      <RenderToggleButton />
    </Stack>
  );
}
