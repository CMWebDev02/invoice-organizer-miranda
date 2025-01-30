import { useEffect } from "react";
import { DirectoryOption } from "./DirectoryOption";
import styles from "./styles/DirectoryDisplayStyles.module.css";

/**
 * @component Renders the directory list and displays directories that match the passed in filter.
 * @param {Function} selectDirectory - Sets the current directory.
 * @param {string} selectedDirectory - Value of the currently selected directory.
 * @param {Function} directoryFilter - Value used to filter directories.
 * @param {Array} directories - Array of arrays, each array contains the directory names corresponding with a letter of the alphabet, ie a corresponds to the first array element.
 * @param {Function} sortFile - Triggers the file sort get request.
 * @param {boolean} showQuickTransferButtons - Denotes if the quick transfer button should be shown for each directory option.
 * @returns {React.JSX.Element}
 */
export function DirectoryList({
  selectDirectory,
  selectedDirectory,
  directoryFilter,
  directories,
  sortFile,
  showQuickTransferButtons,
}) {
  // Stores the directory names that match the current filter
  let filteredNames = [];

  if (directoryFilter !== "") {
    //? The customer array contains arrays that are separated alphabetically, using character codes allows for easy access of the appropriate array.
    const characterIndex = directoryFilter.toUpperCase().charCodeAt(0) - 65;
    if (
      directories[characterIndex] &&
      directories[characterIndex].length !== 0
    ) {
      filteredNames = directories[characterIndex].filter((name) => {
        //* All strings will be capitalized before being compared to allow for instances in which the user chooses to store folders based on their preferred writing convention,
        //* either all uppercase, lowercase, or a mixture of the two.
        if (name.toUpperCase().startsWith(directoryFilter.toUpperCase()))
          return true;
      });
    }
  }

  useEffect(() => {
    /**
     * @function Creates a hot key for the first nine elements within the filtered names array.
     * To provide easier keyboard accessibility when selecting directory options.
     * @param {Event} e - Event that triggered the event listener.
     * @returns {void}
     */
    function quickSelect(e) {
      if (e.keyCode >= 49 && e.keyCode <= 57 && !e.shiftKey) {
        let numberKey = e.keyCode - 49;
        if (filteredNames.length > numberKey) {
          selectDirectory(filteredNames[numberKey]);
        }
      }
    }

    // Creates an event listener that checks fires once a key is pressed.
    addEventListener("keydown", quickSelect);

    return () => {
      removeEventListener("keydown", quickSelect);
    };
  }, [filteredNames]);

  /**
   * @function Triggers the file sort function in the main parent component and passes the information of the chosen directory option.
   * @param {Event} e - Event that triggered the event listener.
   * @returns {void}
   */
  function quickSort(e) {
    // Prevents any object other than the main element from triggering this function as well.
    e.stopPropagation();

    sortFile(e);
  }

  /**
   * @component Renders the filtered names as directory options.
   * @returns {void}
   */
  const RenderFilteredNames = () => {
    return filteredNames.length === 0 ? (
      <h2>No Matching Users</h2>
    ) : (
      filteredNames.map((name, index) => (
        <DirectoryOption
          key={name}
          index={index}
          selectDirectory={selectDirectory}
          name={name}
          style={
            selectedDirectory === name
              ? styles.selectedDirectoryOption
              : styles.directoryOption
          }
          quickSort={quickSort}
          showQuickTransferButtons={showQuickTransferButtons}
        />
      ))
    );
  };

  return (
    <>
      <RenderFilteredNames />
    </>
  );
}
