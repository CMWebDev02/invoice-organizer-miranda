import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stack from "react-bootstrap/esm/Stack";
import styles from "./styles/ChangeLogStyles.module.css";

/**
 * @component Renders a changelog entry based on the various information passed in.
 * @param {object} info - Object containing the various information for the changelog entry.
 * @param {Function} undoChange - Triggers the undo change function.
 * @param {boolean} isButtonDisabled - Denotes if user interaction is enabled for the undo buttons.
 * @param {boolean} showUndoButtons - Denotes if the undo button elements should be rendered for each changelog entry.
 * @returns {React.JSX.Element}
 */
export function ChangeInfo({
  info,
  undoChange,
  isButtonDisabled,
  showUndoButtons,
}) {
  // Initializes a variable to denote if the change action was successful or failed.
  const isSuccessful = info.result === "Succeeded" ? true : false;

  return (
    <Stack
      direction="horizontal"
      className={`${
        isSuccessful ? styles.successfulEntry : styles.failedEntry
      } ${styles.changeLogEntry}`}
      gap={1}
    >
      <p className="w-auto">{info.message}</p>
      {isSuccessful && info.action !== "Undo Action" && showUndoButtons && (
        <button
          className="h-100 ms-auto"
          onClick={() => undoChange(info.undoInfo, info.id, info.action)}
          disabled={isButtonDisabled}
        >
          <FontAwesomeIcon icon={faRotateLeft} color="white" />
        </button>
      )}
    </Stack>
  );
}
