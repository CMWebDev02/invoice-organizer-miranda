import { useEffect, useRef, useState } from "react";
import { UseHotKey } from "../../../hooks/UseHotKey.jsx";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/DirectoryDisplayStyles.module.css";
import Stack from "react-bootstrap/esm/Stack.js";

/**
 * @component Renders the new directory modal and handles the logic for creating new directories on the backend.
 * @param {boolean} showModal - Denotes if the modal should be displayed or hidden.
 * @param {Function} toggleNewFolderModal - Toggles the modal's display boolean.
 * @param {Function} createFolderInfo - Triggers the new directory creation post request to the backend.
 * @returns {React.JSX.Element}
 */
export function NewDirectoryModal({
  showModal,
  toggleNewFolderModal,
  createFolderInfo,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const directoryNameRef = useRef(null);

  // Initializes a hotkey bound to "U" to toggle the new folder modal's display boolean.
  UseHotKey({
    triggerKey: "U",
    action: toggleNewFolderModal,
    variablesCheck: [!showModal],
    dependencies: [showModal],
  });
  // Initializes a hotkey bound to "Enter" to validate the directoryName input's current value
  // before passing it to the create file info function.
  UseHotKey({
    triggerKey: "Enter",
    action: checkName,
    variablesCheck: [!showModal],
    dependencies: [directoryNameRef, showModal],
  });

  /**
   * @function Sets current user focus to the new directory name input.
   * @returns {void}
   */
  function focusDirectoryNameInput() {
    directoryNameRef.current.select();
  }

  // Clears any error message stored in state after two seconds has occurred.
  useEffect(() => {
    let clearErrorMessage;
    if (errorMessage !== "") {
      clearErrorMessage = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    return () => {
      clearTimeout(clearErrorMessage);
    };
  }, [errorMessage]);

  /**
   * @function Validates the new directory name before triggering the new folder creator function.
   * @returns {void}
   */
  function checkName() {
    setErrorMessage("");
    let NewDirectoryName = directoryNameRef.current.value;

    // Ensures the new directory name is not an empty string.
    if (NewDirectoryName !== "") {
      createFolderInfo(NewDirectoryName.toUpperCase());
      toggleNewFolderModal();
    } else {
      setErrorMessage("Please Enter A Valid Directory Name!");
    }
  }

  return (
    <Modal show={showModal} onEntering={focusDirectoryNameInput}>
      <Modal.Header className={`${styles.newDirectoryModalHeader}`}>
        <Modal.Title>Create New Directory</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${styles.newDirectoryModalBody}`}>
        {errorMessage && <h3>{errorMessage}</h3>}
        <Stack
          className={`${styles.userInputContainer}`}
          direction="horizontal"
          gap={2}
        >
          <label
            htmlFor="customerFolderInput"
            className={`${styles.modalLabel}`}
          >
            Directory Name:
          </label>
          <input
            className={`${styles.modalInput} ${styles.userInput}`}
            id="customerFolderInput"
            type="text"
            placeholder="Lastname Firstname"
            ref={directoryNameRef}
          />
        </Stack>
      </Modal.Body>
      <Modal.Footer
        className={`${styles.newDirectoryModalFooter} d-flex justify-content-between`}
      >
        <button className="interfaceButton" onClick={toggleNewFolderModal}>
          Close
        </button>
        <button className="interfaceButton" onClick={checkName}>
          Create Folder
        </button>
      </Modal.Footer>
    </Modal>
  );
}
