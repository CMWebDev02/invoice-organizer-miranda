import { useEffect, useRef } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { useSearchParams } from "react-router";
import { UseHotKey } from "../../../hooks/UseHotKey";
import styles from "../styles/DirectoryDisplayStyles.module.css";

/**
 * @component Handles the displaying the current sorting year and the logic pertaining to setting the file's year.
 * @param {boolean} isDisabled - Denotes if the year selector input should be enabled or disabled.
 * @param {number} yearOffSet - Denotes the numerical range the year input can be set to,
 * the number determines the number of years ahead or years back the input can be set to based on the current year.
 * @returns {React.JSX.Element}
 */
export function YearSelector({ isDisabled, yearOffSet }) {
  // Initializes access to the query parameters that are injected into the url.
  const [queryParameters, setQueryParameters] = useSearchParams();
  const yearInputRef = useRef();
  const currentYear = new Date().getFullYear();

  // Initializes a hot key set to "Y" to allow quick selection of the year input.
  UseHotKey({
    triggerKey: "Y",
    action: focusYearInput,
    variablesCheck: [],
    dependencies: [],
  });

  /**
   * @function Sets current user focus to the year input.
   * @returns {void}
   */
  function focusYearInput() {
    yearInputRef.current.select();
  }

  /**
   * @function Removes focus in the event the user presses the escape key while having the year input in focus.
   * @returns {void}
   */
  function checkFocus(e) {
    if (e.key === "Escape") {
      yearInputRef.current.blur();
    }
  }

  // Updates the url query parameter for year to the current year if there is no value set in the url upon page loading.
  useEffect(() => {
    if (queryParameters.get("year") === null) {
      setQueryParameters((prevParameters) => {
        prevParameters.set("year", new Date().getFullYear());
        return prevParameters;
      });
    }
  }, [queryParameters, setQueryParameters]);

  /**
   * @function Updates the current year value.
   * @param {Event} e - Event that triggered the function.
   * @returns
   */
  function changeYear(e) {
    setQueryParameters((prevParameters) => {
      prevParameters.set("year", e.target.value);
      return prevParameters;
    });
  }

  return (
    <Stack
      direction="horizontal"
      gap={1}
      className={`${styles.userInputContainer} ${styles.yearSelectorContainer} ms-auto`}
    >
      <label htmlFor="year-input">Year:</label>
      <input
        id="year-input"
        type="number"
        className={styles.userInput}
        ref={yearInputRef}
        min={currentYear - yearOffSet}
        max={currentYear + yearOffSet}
        onKeyDown={checkFocus}
        onChange={changeYear}
        value={queryParameters.get("year") || currentYear}
        disabled={isDisabled}
      />
    </Stack>
  );
}
