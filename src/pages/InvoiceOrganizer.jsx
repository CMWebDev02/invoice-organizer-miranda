import { NavBar } from "../components/ui/NavBar";
import { ChangeLogIcon } from "../components/ChangeLog/ChangeLogIcon";
import { UserInputs } from "../components/DirectoryDisplay/UserInteraction/UserInputs"
import { DirectoryDisplay } from "../components/DirectoryDisplay/DirectoryDisplay"
import { InvoiceViewer } from "../components/DirectoryDisplay/InvoiceViewer"
import { NewDirectoryModal } from "../components/DirectoryDisplay/UserInteraction/NewDirectoryModal";
import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";
import { Footer } from "../components/ui/Footer";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

import { ChangeLogStorage } from "../utilities/localStorage";
import { UserSettingsStorage } from "../utilities/localStorage";
import { convertToValidQueryString } from "../utilities/stringConverter";
import { UseURLQueries } from "../hooks/UseURLQueries";

export function InvoiceOrganizer() {
    // const [ queryParameters, setQueryParameters ] = useSearchParams();
    const queryParameters = UseURLQueries();

    const [ isUserInteractionDisabled, setIsUserInteractionDisabled ] = useState(true);

    const [ currentInvoice, setCurrentInvoice ] = useState('');
    const [ selectedCustomer, setSelectedCustomer ] = useState('');
    const [ nameFilter, setNameFilter ] = useState('');

    const [ fileTransfer, setFileTransfer ] = useState(null);
    const [ newCustomerFolderName, setNewCustomerFolderName ] = useState(null);
    const [ changeLog, setChangeLog ] = useState(ChangeLogStorage.getStorage());

    const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);
    const toggleNewDirectoryModal = () => setShowNewDirectoryModal(!showNewDirectoryModal);

    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, fetchResponse: folderCreationResult } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/createNewFolder', queries: newCustomerFolderName})
    const { isLoading: isTransferring, errorOccurred: fileTransferError, fetchResponse: transferResult } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/sortFile', queries: fileTransfer})

    useEffect(() => {
      setIsUserInteractionDisabled(isNewFolderInitializing || isTransferring)
    }, [isTransferring, isNewFolderInitializing])

    useEffect(() => {
      //! If an error occurs for either fetch post attempt, clear the object associate with the action so that the user may attempt to recall their request..
      if (newFolderError) setNewCustomerFolderName(null);
      if (fileTransferError) setFileTransfer(null);
    }, [newFolderError, fileTransferError])

    useEffect(() => {
      //? Checks if a file sort fetch resolved.
      if (transferResult) {
        setChangeLog(prevChanges => [transferResult, ...prevChanges]);
      }
    }, [transferResult])

    useEffect(() => {
      //? Checks if a folderCreation fetch resolved.
      if (folderCreationResult) {
        setChangeLog(prevChanges => [folderCreationResult, ...prevChanges]);
      }
    }, [folderCreationResult])

    useEffect(() => {
      if (changeLog) {
        // Potential change (UserSettingsStorage.getStorage()).changeLogActions to use the userSettings instead
        ChangeLogStorage.setStorage(changeLog, 5)
      }
    }, [changeLog])

    function createFileInfo(e) {
      //? Checks if the event's target contains a valid name property, if so this name is used, otherwise the state value for the selected customer is used.
      //* This is necessary for the quick transfer feature, this allows the selected customer to remain stored in state while still allowing the user to quickly transfer to another customer if they
      //* click the quick transfer button.
      let customerName = e.target.name ? e.target.name : selectedCustomer;
      if (customerName == '' || currentInvoice == '') return;

      let queryString = convertToValidQueryString(customerName);

      setFileTransfer({
        invoiceName: currentInvoice, 
        customerFolderPath: `${queryString[0].toUpperCase()}/${queryString.toUpperCase()}`,
        customerName: queryString.toUpperCase(),
        year: queryParameters.get('year'),
      });
    }

    return (
      <>
        <NavBar PageName={'Invoice Organizer'}>
          <ChangeLogIcon isChanging={isNewFolderInitializing || isTransferring} changeResult={changeLog[0]} />

          <button onClick={createFileInfo} disabled={isUserInteractionDisabled}>Sort</button>
          <button onClick={toggleNewDirectoryModal}>Create Folder</button>
        </NavBar>

        <main> 
          <UserInputs filter={[nameFilter, setNameFilter]} isInteractionDisabled={isUserInteractionDisabled} />

            
          <div>
            <DirectoryDisplay 
                setIsUserInteractionDisabled={setIsUserInteractionDisabled} sortFile={createFileInfo} 
                    nameFilter={nameFilter} setCustomer={setSelectedCustomer} />

            <ChangeLogDisplay changeLog={changeLog} alterChangeLog={setChangeLog} />
          </div>

          <InvoiceViewer setCurrentInvoice={setCurrentInvoice} transferOccurred={transferResult} />

          <NewDirectoryModal showModal={showNewDirectoryModal} toggleNewFolderModal={toggleNewDirectoryModal} newCustomerFolderName={setNewCustomerFolderName} />
        </main>

        {/* Turn these into toast Icons for the bottom right of the screen */}
        {fileTransferError && <h2>{fileTransferError}</h2>}
        {newFolderError && <h2>{newFolderError}</h2>}


        <Footer>
            <button onClick={createFileInfo} disabled={isUserInteractionDisabled} >Sort</button>
            <button onClick={toggleNewDirectoryModal} >Create Folder</button>
        </Footer>
      </>
    )
}