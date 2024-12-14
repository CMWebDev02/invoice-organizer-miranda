import { NavBar } from "../components/ui/NavBar";
import { ChangeLogIcon } from "../components/ChangeLog/ChangeLogIcon";
import { DirectoryFilter } from "../components/DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../components/YearSelection/YearSelector";
import { DirectoryDisplay } from "../components/DirectoryDisplay/DirectoryDisplay"
import { InvoiceViewer } from "../components/DirectoryDisplay/InvoiceViewer"
import { NewDirectoryModal } from "../components/DirectoryDisplay/UserInteraction/NewDirectoryModal";
import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";
import { Footer } from "../components/ui/Footer";

import { useEffect, useState } from "react";
import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

import { InvoiceOrganizerChangeLog } from "../utilities/localStorage";
import { UserSettingsStorage } from "../utilities/localStorage";
import { convertToValidQueryString } from "../utilities/stringMutations";
import { UseURLQueries } from "../hooks/UseURLQueries";
import { UseToggler } from "../hooks/UseToggler";

export function InvoiceOrganizer() {
  const maximumChangeLogActionStore = UserSettingsStorage.getSpecificSetting('CHANGELOG_ACTIONS');
    const queryParameters = UseURLQueries({pageName: 'Invoice'});

    const [ nameFilter, setNameFilter ] = useState('');
    const [ isUserInteractionDisabled, setIsUserInteractionDisabled ] = useState(true);

    const [ fileTransfer, setFileTransfer ] = useState(null);
    const [ newCustomerFolderName, setNewCustomerFolderName ] = useState(null);
    const [ changeLog, setChangeLog ] = useState(InvoiceOrganizerChangeLog.getStorage());

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
        InvoiceOrganizerChangeLog.setStorage(changeLog, maximumChangeLogActionStore)
      }
    }, [maximumChangeLogActionStore, changeLog])

    function createFileInfo(e) {
      //? Checks if the event's target contains a valid name property, if so this name is used, otherwise the state value for the selected customer is used.
      //* This is necessary for the quick transfer feature, this allows the selected customer to remain stored in state while still allowing the user to quickly transfer to another customer if they
      //* click the quick transfer button.
      let customerName = e.target.name ? e.target.name : queryParameters.get('selectedCustomer');
      if (customerName == null || queryParameters.get('currentInvoice') == null) return;

      let queryString = convertToValidQueryString(customerName);

      setFileTransfer({
        invoiceName: queryParameters.get('currentInvoice'), 
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
          <div>
            <DirectoryFilter filter={[nameFilter, setNameFilter]} isDisabled={isUserInteractionDisabled} />
            
            <YearSelector isDisabled={isUserInteractionDisabled} />
          </div>

          <div>
            <DirectoryDisplay nameFilter={nameFilter}
                setIsUserInteractionDisabled={setIsUserInteractionDisabled} sortFile={createFileInfo}/>

            <ChangeLogDisplay changeLog={changeLog.slice(0)} alterChangeLog={setChangeLog} />
          </div>

          <InvoiceViewer transferOccurred={transferResult} />

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