import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
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

export function InvoiceOrganizer({ pageName, endPointURL, changeLogStorage}) {
    const maximumChangeLogActionStore = UserSettingsStorage.getSpecificSetting('CHANGELOG_ACTIONS');
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    const [ directoryFilter, setDirectoryFilter ] = useState('');
    const {value: isUserInteractionDisabled, updateBoolean: updateIsLoadingBoolean} = UseToggler({initialValue: true})

    const [ changeLog, setChangeLog ] = useState(changeLogStorage.getStorage());

    const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);

    const [ showOffCanvasMenu, setShowOffCanvasMenu ] = useState(false);

    const [ createFileInfoError, setCreateFileInfoError ] = useState(undefined);
    
    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, triggerFetchPostRequest: triggerFolderCreation } = UseFetchPostRequest({fetchURLBase: `${endPointURL}/${pageName}/create-new-folder`, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-customerFolders` })
    const { isLoading: isTransferring, errorOccurred: fileTransferError, triggerFetchPostRequest: triggerFileSort } = UseFetchPostRequest({fetchURLBase: `${endPointURL}/${pageName}/sort-file`, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-invoiceViewer` })

    const enterHotKey = UseHotKey({triggerKey: 'Enter', action: createFileInfo, variablesCheck: [showNewDirectoryModal, isUserInteractionDisabled.isDisabled], dependencies: [queryParameters, showNewDirectoryModal, isUserInteractionDisabled]})

    useEffect(() => {
        updateIsLoadingBoolean({name: 'newFolderInitializing', value: isNewFolderInitializing})
    }, [isNewFolderInitializing])

    useEffect(() => {
      updateIsLoadingBoolean({name: 'fileTransferring', value: isTransferring})
  }, [isTransferring])

    useEffect(() => {
      if (changeLog) {
        changeLogStorage.setStorage(changeLog, maximumChangeLogActionStore)
      }
    }, [maximumChangeLogActionStore, changeLog, changeLogStorage])

    
    const handleCloseMenu = () => setShowOffCanvasMenu(false);
    
    const handleShowMenu = () => setShowOffCanvasMenu(true);
    
    function toggleNewDirectoryModal() {
      setShowNewDirectoryModal(!showNewDirectoryModal);
      handleCloseMenu()
    };

    function createFolderInfo(directoryName) {
      let directoryFolderQuery = convertToValidQueryString(directoryName);
      triggerFolderCreation({
        letterFolder: directoryName[0],
        directoryFolderName: directoryFolderQuery
      });
    }

    function createFileInfo(e) {
      //? Sets the fileInfoError message to undefined, to clear any previously errors.
          //* Undefined is used to make this error message function the same as react query's error handling.
      setCreateFileInfoError(undefined)

      //? Checks if the event's target contains a valid name property, if so this name is used, otherwise the state value for the selected directory is used.
      //* This is necessary for the quick transfer feature, this allows the selected directory to remain stored in state while still allowing the user to quickly transfer to another directory if they
      //* click the quick transfer button.
      let directoryName = e != undefined && e?.target?.name ? e.target.name : queryParameters.get('selectedDirectory');
      // Checks that all of the required information is present for making a file transfer, and if something is missing the function returns.
      //! Have this generate an error that prints on screen to alert the user that critical information is missing for the file transfer
      if (directoryName == '' || queryParameters.get('currentInvoice') == '' || queryParameters.get('year') == '' || queryParameters.get('year').length != 4) {
        let errorMessage = '';
        if (directoryName == '') errorMessage += 'The currently selected directory is invalid!\n';
        if (queryParameters.get('currentInvoice') == '') errorMessage += 'The current invoice name is invalid!\n';
        if (queryParameters.get('year') == '' || queryParameters.get('year').length != 4) errorMessage += 'The current year is invalid!\n';
        setCreateFileInfoError(errorMessage);
        return;
      }

      let queryString = convertToValidQueryString(directoryName);

      triggerFileSort({
        invoiceName: queryParameters.get('currentInvoice'), 
        directoryFolderPath: `${queryString[0].toUpperCase()}/${queryString.toUpperCase()}`,
        directoryName: queryString.toUpperCase(),
        year: queryParameters.get('year'),
      });
    }

    return (
      <>
        <Container fluid>
          <NavBar isChanging={isNewFolderInitializing || isTransferring} lastChange={changeLog[0]} 
            toggleNewDirectoryModal={toggleNewDirectoryModal} isUserInteractionDisabled={isUserInteractionDisabled.isDisabled} 
              createFileInfo={createFileInfo} handleShowMenu={handleShowMenu} pageName={pageName} />

          <MainContainer directoryFilter={directoryFilter} alterDirectoryFilter={setDirectoryFilter} isUserInteractionDisabled={isUserInteractionDisabled.isDisabled}
            pageName={pageName} endPointURL={endPointURL} updateIsLoadingBoolean={updateIsLoadingBoolean} sortFile={createFileInfo} 
              changeLog={changeLog} alterChangeLog={setChangeLog}/>


          <Footer createFileInfo={createFileInfo} userInteraction={isUserInteractionDisabled.isDisabled}
            toggleNewDirectoryModal={toggleNewDirectoryModal} />

          <NewDirectoryModal showModal={showNewDirectoryModal} toggleNewFolderModal={toggleNewDirectoryModal} createFolderInfo={createFolderInfo}  />
          
          <OffCanvasMenu isDisplayed={showOffCanvasMenu} handleCloseMenu={handleCloseMenu} toggleNewDirectoryModal={toggleNewDirectoryModal} isUserInteractionDisabled={isUserInteractionDisabled.isDisabled} />

          
          <ErrorToastDisplay errorsArray={[{name: 'Sort File Error', message: createFileInfoError}, {name: 'File Transfer Error', message: fileTransferError}, {name: 'New Folder Error', message: newFolderError}]} />
        </Container>
      </>
    )
}