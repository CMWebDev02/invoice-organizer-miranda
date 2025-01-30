import { useState } from "react";
import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";

/**
 * @component
 * @param {clearChangeLogRef} RefObject - Reference to the current changelog to allow the user to clear it's contents from localStorage.
 * @param {changeLogClass} Class - Changelog class associated with the current changelog, this class houses all of the methods and attributes need to alter the current changelog.
 * @param {filterBy} string - Current value used to filtering the changelog entries.
 * @param {string} endpointURL - Base endpoint url of the server.
 * @returns {React.JSX.Element}
 */
export function ChangeLog({
  clearChangeLogRef,
  changeLogClass,
  filterBy,
  endPoint,
}) {
  //* This changeLog is the main one, it will store all of the data without being affected by the filter, it will only remove actions when their undo process executed successfully.
  const [changeLog, setChangeLog] = useState(changeLogClass.getStorage());

  /**
   * @function Clears the current changelog.
   * @returns {void}
   */
  function clearChangeLog() {
    changeLogClass.resetStorage();
    //* The getStorage class method is called to reinitialize the changelog in local storage once it is removed.
    setChangeLog(changeLogClass.getStorage());
  }

  // Sets the current value of the reference object to the clearChangeLog function so that it can be called in the parent component.
  clearChangeLogRef.current = clearChangeLog;

  //* This changeLog will be used to display the actions the user wishes to see and will remove elements depending on the selected filter.
  const displayChangeLog =
    filterBy === null
      ? [...changeLog]
      : changeLog.filter((change) => change.action === filterBy);

  return (
    <>
      <ChangeLogDisplay
        changeLog={displayChangeLog}
        alterChangeLog={setChangeLog}
        endPoint={endPoint}
        showUndoButtons={true}
      />
    </>
  );
}
