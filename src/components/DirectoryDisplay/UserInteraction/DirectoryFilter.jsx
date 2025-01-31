import React, { useRef } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { UseHotKey } from "../../../hooks/UseHotKey";
import styles from "../styles/DirectoryDisplayStyles.module.css";

/**
 * @component Renders the directory filter input to allow the user to filter through all directory options.
 * @param {Array} filter - Array containing the filter value and the setter function to alter the state of the filter value.
 * @param {boolean} isDisabled - Denotes if the year selector input should be enabled or disabled.
 * @returns {React.JSX.Element}
 */
export function DirectoryFilter({ filter, isDisabled }) {
  // Deconstructs the filterValue and its setter function from the passed in array.
  const [filterValue, setFilterValue] = filter;
  const filterRef = useRef();

  // Initializes a hotkey set to "F" that shifts focus to the filter input once pressed.
  UseHotKey({
    triggerKey: "F",
    action: focusFilterInput,
    variablesCheck: [],
    dependencies: [],
  });

  /**
   * @function Sets current user focus to the filter input.
   * @returns {void}
   */
  function focusFilterInput() {
    filterRef.current.select();
  }

  /**
   * @function Removes focus in the event the user presses the escape key while having the filter input in focus.
   * @returns {void}
   */
  function checkFocus(e) {
    if (e.key === "Escape") {
      filterRef.current.blur();
    }
  }

  /**
   * @function Determines which directory array to display to the user and filter through.
   * The first character of the filter input must be a letter, otherwise the key press is ignored.
   * @param {Event} e - Event that triggered the function.
   * @returns {void}
   */
  function checkFilterValue(e) {
    // Sets the input's value to a capital to simplify validation process.
    let filterInput = e.target.value.toUpperCase();

    // Checks if the filter input is greater than 1
    if (filterInput.length !== 1) {
      // If the length is greater than one then no checks need to be made and the input's value can be directly set as the state's value.
      setFilterValue(e.target.value);
    } else {
      //* Offsets by 65 to make the process of filtering for the 26 capital letters of the alphabet more simplistic.
      let firstCharacterCode = filterInput.charCodeAt(0) - 65;

      // If the first character is a letter, then the filterValue's state is updated.
      if (firstCharacterCode >= 0 && firstCharacterCode < 26)
        setFilterValue(e.target.value);
    }
  }

  return (
    <Stack
      direction="horizontal"
      gap={1}
      className={`${styles.userInputContainer} ${styles.directoryFilterContainer}`}
    >
      <label htmlFor="directoryFilter">Find:</label>
      <input
        id="directoryFilter"
        type="text"
        placeholder="Filter By..."
        value={filterValue}
        onChange={checkFilterValue}
        onKeyDown={checkFocus}
        disabled={isDisabled}
        className={styles.userInput}
        ref={filterRef}
      />
    </Stack>
  );
}
