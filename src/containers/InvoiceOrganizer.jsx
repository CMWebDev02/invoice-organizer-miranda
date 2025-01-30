import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Container from "react-bootstrap/esm/Container";

import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";
import { UseToggler } from "../hooks/UseToggler";

import { NavBar } from "../components/InvoiceOrganizerUI/NavBar";
import { Footer } from "../components/InvoiceOrganizerUI/Footer";
import { MainContainer } from "../components/InvoiceOrganizerUI/MainContainer";
import { NewDirectoryModal } from "../components/DirectoryDisplay/UserInteraction/NewDirectoryModal";
import { OffCanvasMenu } from "../components/InvoiceOrganizerUI/OffCanvasMenu";
import { ErrorToastDisplay } from "../components/ErrorPopUps/ErrorToastDisplay";

import { convertToValidQueryString } from "../utilities/stringMutations";
import { UserSettingsStorage } from "../utilities/localStorage";
import { UseHotKey } from "../hooks/UseHotKey";

/**
 * @component Container housing all logic and components related to file sorting and directory creations.
 * @param {string} pageName - Name of the current organizer.
 * @param {string} endpointURL - Base endpoint url of the server.
 * @param {class} changeLogStorage - Change log storage associated with the current organizer.
 * @returns {React.JSX.Element}
 */
export function InvoiceOrganizer({ pageName, endPointURL, changeLogStorage }) {
  // Pulls user settings from local storage.
  const userSettings = UserSettingsStorage.getStorage();
  // Injects needed queries into the url
  const [queryParameters, setQueryParameters] = useSearchParams();

  const [directoryFilter, setDirectoryFilter] = useState("");
  const {
    value: isUserInteractionDisabled,
    updateBoolean: updateIsLoadingBoolean,
  } = UseToggler({ initialValue: true });

  const [changeLog, setChangeLog] = useState(changeLogStorage.getStorage());

  const [showNewDirectoryModal, setShowNewDirectoryModal] = useState(false);

  const [showOffCanvasMenu, setShowOffCanvasMenu] = useState(false);

  const [createFileInfoError, setCreateFileInfoError] = useState(undefined);

  const {
    isLoading: isNewFolderInitializing,
    errorOccurred: newFolderError,
    triggerFetchPostRequest: triggerFolderCreation,
  } = UseFetchPostRequest({
    fetchURLBase: `${endPointURL}/${pageName}/create-new-folder`,
    alterChangeLog: setChangeLog,
    associateFetchKey: `${pageName}-customerFolders`,
  });
  const {
    isLoading: isTransferring,
    errorOccurred: fileTransferError,
    triggerFetchPostRequest: triggerFileSort,
  } = UseFetchPostRequest({
    fetchURLBase: `${endPointURL}/${pageName}/sort-file`,
    alterChangeLog: setChangeLog,
    associateFetchKey: `${pageName}-invoiceViewer`,
  });

  // Initializes a hot ket for enter to trigger the file sort logic.
  UseHotKey({
    triggerKey: "Enter",
    action: createFileInfo,
    variablesCheck: [
      showNewDirectoryModal,
      isUserInteractionDisabled.isDisabled,
    ],
    dependencies: [
      queryParameters,
      showNewDirectoryModal,
      isUserInteractionDisabled,
    ],
  });

  useEffect(() => {
    // Updates the toggler with the status of the current new folder post request.
    updateIsLoadingBoolean({
      name: "newFolderInitializing",
      value: isNewFolderInitializing,
    });
  }, [isNewFolderInitializing]);

  useEffect(() => {
    // Updates the toggler with the status of the current file sort transfer.
    updateIsLoadingBoolean({ name: "fileTransferring", value: isTransferring });
  }, [isTransferring]);

  useEffect(() => {
    if (changeLog) {
      // Updates the changelog stored in local storage.
      changeLogStorage.setStorage(changeLog, userSettings.CHANGELOG_ACTIONS);
    }
  }, [userSettings, changeLog, changeLogStorage]);

  const handleCloseMenu = () => setShowOffCanvasMenu(false);

  const handleShowMenu = () => setShowOffCanvasMenu(true);

  function toggleNewDirectoryModal() {
    setShowNewDirectoryModal(!showNewDirectoryModal);

    handleCloseMenu();
  }

  // Initializes a hotkey to "U" for triggering the new directory modal;
  UseHotKey({
    triggerKey: "U",
    action: toggleNewDirectoryModal,
    variablesCheck: [showNewDirectoryModal],
    dependencies: [],
  });

  /**
   * @function Triggers the new directory creation post request.
   * @param {string} directoryName - Name of the directory being created.
   * @returns {void}
   */
  function createFolderInfo(directoryName) {
    // Converts the directory name to a valid query string.
    let directoryFolderQuery = convertToValidQueryString(directoryName);
    // Passes an object containing the necessary info to create a new directory to the mutation request function.
    triggerFolderCreation({
      letterFolder: directoryName[0],
      directoryFolderName: directoryFolderQuery,
    });
  }

  /**
   * @function Triggers the file sort post request.
   * @param {event} e - Event associated with triggering the function.
   * @returns {void}
   */
  function createFileInfo(e) {
    //? Sets the fileInfoError message to undefined, to clear any previously errors.
    //* Undefined is used to make this error message function the same as react query's error handling.
    setCreateFileInfoError(undefined);

    //? Checks if the event's target contains a valid name property, if so this name is used, otherwise the state value for the selected directory is used.
    //* This is necessary for the quick transfer feature, this allows the selected directory to remain stored in state while still allowing the user to quickly transfer to another directory if they
    //* click the quick transfer button.
    let directoryName =
      e !== undefined && e?.target?.name
        ? e.target.name
        : queryParameters.get("selectedDirectory");
    // Checks that all of the required information is present for making a file transfer, and if something is missing the function returns.
    //! Have this generate an error that prints on screen to alert the user that critical information is missing for the file transfer
    if (
      directoryName === "" ||
      queryParameters.get("currentInvoice") === "" ||
      queryParameters.get("year") === "" ||
      queryParameters.get("year").length != 4
    ) {
      let errorMessage = "";
      if (directoryName === "")
        errorMessage += "The currently selected directory is invalid!\n";
      if (queryParameters.get("currentInvoice") === "")
        errorMessage += "The current invoice name is invalid!\n";
      if (
        queryParameters.get("year") === "" ||
        queryParameters.get("year").length !== 4
      )
        errorMessage += "The current year is invalid!\n";
      setCreateFileInfoError(errorMessage);
      return;
    }

    // If all info is present then the directory name is converted to a query string.
    let queryString = convertToValidQueryString(directoryName);

    // Finally, the function is called and passed the information needed to sort the current invoice.
    triggerFileSort({
      invoiceName: queryParameters.get("currentInvoice"),
      directoryFolderPath: `${queryString[0].toUpperCase()}/${queryString.toUpperCase()}`,
      directoryName: queryString.toUpperCase(),
      year: queryParameters.get("year"),
    });
  }

  return (
    <>
      <Container fluid>
        <NavBar
          isChanging={isNewFolderInitializing || isTransferring}
          lastChange={changeLog[0]}
          toggleNewDirectoryModal={toggleNewDirectoryModal}
          isUserInteractionDisabled={isUserInteractionDisabled.isDisabled}
          createFileInfo={createFileInfo}
          handleShowMenu={handleShowMenu}
          pageName={pageName}
        />

        <MainContainer
          directoryFilter={directoryFilter}
          alterDirectoryFilter={setDirectoryFilter}
          isUserInteractionDisabled={isUserInteractionDisabled.isDisabled}
          pageName={pageName}
          endPointURL={endPointURL}
          updateIsLoadingBoolean={updateIsLoadingBoolean}
          sortFile={createFileInfo}
          changeLog={changeLog}
          alterChangeLog={setChangeLog}
          userSettings={userSettings}
        />

        <Footer
          createFileInfo={createFileInfo}
          userInteraction={isUserInteractionDisabled.isDisabled}
          toggleNewDirectoryModal={toggleNewDirectoryModal}
          currentPage={pageName}
        />

        <ErrorToastDisplay
          errorsArray={[
            { name: "Sort File Error", message: createFileInfoError },
            { name: "File Transfer Error", message: fileTransferError },
            { name: "New Folder Error", message: newFolderError },
          ]}
        />

        <NewDirectoryModal
          showModal={showNewDirectoryModal}
          toggleNewFolderModal={toggleNewDirectoryModal}
          createFolderInfo={createFolderInfo}
        />

        <OffCanvasMenu
          currentPage={pageName}
          isDisplayed={showOffCanvasMenu}
          handleCloseMenu={handleCloseMenu}
          toggleNewDirectoryModal={toggleNewDirectoryModal}
          isUserInteractionDisabled={isUserInteractionDisabled.isDisabled}
        />
      </Container>
    </>
  );
}
