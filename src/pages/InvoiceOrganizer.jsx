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
    const {value: isUserInteractionDisabled, alterValue: alterUserInteraction} = UseToggler({initialValue: true})

    const [ changeLog, setChangeLog ] = useState(InvoiceOrganizerChangeLog.getStorage());

    const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);
    const toggleNewDirectoryModal = () => setShowNewDirectoryModal(!showNewDirectoryModal);

    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, triggerFetchPostRequest: triggerFolderCreation } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/createNewFolder', alterChangeLog: setChangeLog, associateFetchKey: 'customerFolders' })
    const { isLoading: isTransferring, errorOccurred: fileTransferError, triggerFetchPostRequest: triggerFileSort } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/sortFile', alterChangeLog: setChangeLog, associateFetchKey: 'invoiceViewer' })

    useEffect(() => {
      if (isNewFolderInitializing || isTransferring) {
        alterUserInteraction({type: 'SET_ACTIVE'});
      } else {
        alterUserInteraction({type: 'SET_DISABLED'});
      }
    }, [isTransferring, isNewFolderInitializing, alterUserInteraction])

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
      // Checks that all of the required information is present for making a file transfer, and if something is missing the function returns.
      //! Have this generate an error that prints on screen to alert the user that critical information is missing for the file transfer
      if (customerName == '' || queryParameters.get('currentInvoice') == '' || queryParameters.get('year') == '') return;

      let queryString = convertToValidQueryString(customerName);

      triggerFileSort({
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

          <button onClick={createFileInfo} disabled={isUserInteractionDisabled.isActive}>Sort</button>
          <button onClick={toggleNewDirectoryModal}>Create Folder</button>
        </NavBar>

        <main> 
          <div>
            <DirectoryFilter filter={[nameFilter, setNameFilter]} isDisabled={isUserInteractionDisabled.isActive} />
            
            <YearSelector isDisabled={isUserInteractionDisabled.isActive} />
          </div>

          <div>
            <DirectoryDisplay nameFilter={nameFilter}
                alterUserInteraction={alterUserInteraction} sortFile={createFileInfo}/>

            <ChangeLogDisplay changeLog={changeLog.slice(0)} alterChangeLog={setChangeLog} />
          </div>

          <InvoiceViewer alterUserInteraction={alterUserInteraction} />

          <NewDirectoryModal showModal={showNewDirectoryModal} toggleNewFolderModal={toggleNewDirectoryModal} triggerFolderCreation={triggerFolderCreation} />
        </main>

        {/* Turn these into toast Icons for the bottom right of the screen */}
        {fileTransferError && <h2>{fileTransferError}</h2>}
        {newFolderError && <h2>{newFolderError}</h2>}


        <Footer>
            <button onClick={createFileInfo} disabled={isUserInteractionDisabled.isActive} >Sort</button>
            <button onClick={toggleNewDirectoryModal} >Create Folder</button>
        </Footer>
      </>
    )
}