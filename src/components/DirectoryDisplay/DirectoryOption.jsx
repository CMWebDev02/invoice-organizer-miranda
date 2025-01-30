import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @component Renders a directory option containing the directory's name, and based on the index value it might display a number associated with the option which is used for denoting hotkeys.
 * @param {string} name - Directory display name.
 * @param {Function} selectDirectory - Sets the directory as the currently selected one.
 * @param {object} style - Contains the style classname for the directory option, can be one of two classes.
 * @param {Function} quickSort - Triggers the file sort get request..
 * @param {number} index - Current index value of the directory option.
 * @param {boolean} showQuickTransferButtons - Denotes if the quick transfer button should be displayed or not.
 * @returns {React.JSX.Element}
 */
export function DirectoryOption({
  name,
  selectDirectory,
  style,
  quickSort,
  index,
  showQuickTransferButtons,
}) {
  return (
    <div
      key={`folder-${name}`}
      id={name}
      onClick={selectDirectory}
      className={`${style} w-50 d-flex justify-content-between align-items-center`}
    >
      <p>
        {index <= 8 && <span>{index + 1}. </span>}
        {name}
      </p>
      {showQuickTransferButtons && (
        <button name={name} onClick={quickSort}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} color="white" />
        </button>
      )}
    </div>
  );
}
