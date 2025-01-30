import Stack from "react-bootstrap/esm/Stack";
import styles from "./styles/UserSettingStyles.module.css";

/**
 * @component Renders a user setting with a label and a number input.
 * @param {boolean} currentSetting - Current snapshot value of the setting.
 * @param {Function} updateSetting - Function used to update the current setting.
 * @param {Function} settingName - Name of the setting.
 * @param {ReactNode} children - Node elements wrapped within the component.
 * @returns {React.JSX.Element}
 */
export function NumberSetting({
  currentSetting,
  updateSetting,
  settingName,
  children,
}) {
  return (
    <Stack direction="horizontal" className={`w-100`}>
      <label htmlFor={settingName} className={`${styles.settingsLabel} w-75`}>
        {children}
      </label>
      <input
        id={settingName}
        className={`${styles.settingsInput} w-25`}
        type="number"
        min={1}
        max={50}
        value={currentSetting}
        onChange={(e) => updateSetting(settingName, e.target.value)}
      />
    </Stack>
  );
}
