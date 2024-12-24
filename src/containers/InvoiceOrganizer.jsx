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

import { UserSettingsStorage } from "../utilities/localStorage";
import { convertToValidQueryString } from "../utilities/stringMutations";
import { UseToggler } from "../hooks/UseToggler";
import { useSearchParams } from "react-router";

// Things that will be different based on the selected page,
// // - Page name
// // - Sort File Url
// // - File Creation Url
// // - changeLog in localStorage
// // - keys used in url queries, mainly appending the name of the page to the ones I preset
// Object and query parameters created when sending info through a post request.

// TODO Add a page indicator Property on the undo object to allow the file api to know which file path to append to the passed in file name strings.
// TODO Having a settings object initialize and store in local storage even if the user does not visit the settings page first.
export function InvoiceOrganizer({ pageName, fileSortEndPoint, folderCreationEndPoint, changeLogStorage}) {
    const maximumChangeLogActionStore = UserSettingsStorage.getSpecificSetting('CHANGELOG_ACTIONS');
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    const [ directoryFilter, setDirectoryFilter ] = useState('');
    const {value: isUserInteractionDisabled, alterValue: alterUserInteraction} = UseToggler({initialValue: true})

    // Edit changeLog command to get the changelog associated with the page
    const [ changeLog, setChangeLog ] = useState(changeLogStorage.getStorage());

    const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);
    const toggleNewDirectoryModal = () => setShowNewDirectoryModal(!showNewDirectoryModal);

    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, triggerFetchPostRequest: triggerFolderCreation } = UseFetchPostRequest({fetchURLBase: folderCreationEndPoint, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-customerFolders` })
    const { isLoading: isTransferring, errorOccurred: fileTransferError, triggerFetchPostRequest: triggerFileSort } = UseFetchPostRequest({fetchURLBase: fileSortEndPoint, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-invoiceViewer` })

    useEffect(() => {
      if (isNewFolderInitializing || isTransferring) {
        alterUserInteraction({type: 'SET_ACTIVE'});
      } else {
        alterUserInteraction({type: 'SET_DISABLED'});
      }
    }, [isTransferring, isNewFolderInitializing, alterUserInteraction])

    useEffect(() => {
      if (changeLog) {
        changeLogStorage.setStorage(changeLog, maximumChangeLogActionStore)
      }
    }, [maximumChangeLogActionStore, changeLog, changeLogStorage])

    function createFileInfo(e) {
      //? Checks if the event's target contains a valid name property, if so this name is used, otherwise the state value for the selected directory is used.
      //* This is necessary for the quick transfer feature, this allows the selected directory to remain stored in state while still allowing the user to quickly transfer to another directory if they
      //* click the quick transfer button.
      let directoryName = e.target.name ? e.target.name : queryParameters.get('selectedDirectory');
      // Checks that all of the required information is present for making a file transfer, and if something is missing the function returns.
      //! Have this generate an error that prints on screen to alert the user that critical information is missing for the file transfer
      if (directoryName == '' || queryParameters.get('currentInvoice') == '' || queryParameters.get('year') == '') return;

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
        <NavBar pageName={pageName}>
          <ChangeLogIcon isChanging={isNewFolderInitializing || isTransferring} changeResult={changeLog[0]} />

          <button onClick={createFileInfo} disabled={isUserInteractionDisabled.isActive}>Sort</button>
          <button onClick={toggleNewDirectoryModal}>Create Folder</button>
        </NavBar>

        <main> 
          <div>
            <DirectoryFilter filter={[directoryFilter, setDirectoryFilter]} isDisabled={isUserInteractionDisabled.isActive} />
            
            <YearSelector isDisabled={isUserInteractionDisabled.isActive} />
          </div>

          <div>
            <DirectoryDisplay directoryFilter={directoryFilter} fetchKey={`${pageName}-customerFolders`}
                alterUserInteraction={alterUserInteraction} sortFile={createFileInfo}/>
            
            {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
            <ChangeLogDisplay changeLog={changeLog.slice(0)} alterChangeLog={setChangeLog} />
          </div>

          <InvoiceViewer alterUserInteraction={alterUserInteraction} fetchKey={`${pageName}-invoiceViewer`} />

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