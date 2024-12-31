import { NavBar } from "../components/ui/NavBar";
import { ChangeLogIcon } from "../components/ChangeLog/ChangeLogIcon";
import { DirectoryFilter } from "../components/DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../components/YearSelection/YearSelector";
import { DirectoryDisplay } from "../components/DirectoryDisplay/DirectoryDisplay"
import { InvoiceViewer } from "../components/DirectoryDisplay/InvoiceViewer"
import { NewDirectoryModal } from "../components/DirectoryDisplay/UserInteraction/NewDirectoryModal";
import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";

import { useEffect, useState } from "react";
import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

import { UserSettingsStorage } from "../utilities/localStorage";
import { convertToValidQueryString } from "../utilities/stringMutations";
import { UseToggler } from "../hooks/UseToggler";
import { Link, useSearchParams } from "react-router";
import { OffCanvasMenu } from "../components/ui/OffCanvasMenu";
import { ErrorToastDisplay } from "../components/ErrorPopUps/ErrorToastDisplay";

export function InvoiceOrganizer({ pageName, endPointURL, changeLogStorage}) {
    const maximumChangeLogActionStore = UserSettingsStorage.getSpecificSetting('CHANGELOG_ACTIONS');
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    const [ directoryFilter, setDirectoryFilter ] = useState('');
    const {value: isUserInteractionDisabled, alterValue: alterUserInteraction} = UseToggler({initialValue: true})

    const [ changeLog, setChangeLog ] = useState(changeLogStorage.getStorage());

    const [ showNewDirectoryModal, setShowNewDirectoryModal ] = useState(false);

    const [ showOffCanvasMenu, setShowOffCanvasMenu ] = useState(false);

    const [ createFileInfoError, setCreateFileInfoError ] = useState(undefined);
    
    const { isLoading: isNewFolderInitializing, errorOccurred: newFolderError, triggerFetchPostRequest: triggerFolderCreation } = UseFetchPostRequest({fetchURLBase: `${endPointURL}/${pageName}/create-new-folder`, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-customerFolders` })
    const { isLoading: isTransferring, errorOccurred: fileTransferError, triggerFetchPostRequest: triggerFileSort } = UseFetchPostRequest({fetchURLBase: `${endPointURL}/${pageName}/sort-file`, alterChangeLog: setChangeLog, associateFetchKey: `${pageName}-invoiceViewer` })

    useEffect(() => {
      if (isNewFolderInitializing || isTransferring) {
        alterUserInteraction({type: 'SET_DISABLED'});
      } else {
        alterUserInteraction({type: 'SET_ENABLED'});
      }
    }, [isTransferring, isNewFolderInitializing, alterUserInteraction])

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
      let directoryName = e.target.name ? e.target.name : queryParameters.get('selectedDirectory');
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
        <NavBar pageName={pageName}>
          <ChangeLogIcon isChanging={isNewFolderInitializing || isTransferring} changeResult={changeLog[0]} />

          <button onClick={toggleNewDirectoryModal} disabled={isUserInteractionDisabled.isDisabled}>Create Folder</button>
          <button onClick={createFileInfo} disabled={isUserInteractionDisabled.isDisabled}>Sort</button>
          <button onClick={handleShowMenu}>Menu</button>
        </NavBar>

        <main> 
          <div>
            <DirectoryFilter filter={[directoryFilter, setDirectoryFilter]} isDisabled={isUserInteractionDisabled.isDisabled} />
            
            <YearSelector isDisabled={isUserInteractionDisabled.isDisabled} />
          </div>

          <div>
            <DirectoryDisplay directoryFilter={directoryFilter} fetchKey={`${pageName}-customerFolders`}
                alterUserInteraction={alterUserInteraction} sortFile={createFileInfo} endPoint={`${endPointURL}/${pageName}`} />
            
            {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
            <ChangeLogDisplay endPoint={`${endPointURL}/${pageName}`} changeLog={changeLog.slice(0)} alterChangeLog={setChangeLog} />
          </div>

          <InvoiceViewer alterUserInteraction={alterUserInteraction} endPoint={`${endPointURL}/${pageName}`} fetchKey={`${pageName}-invoiceViewer`} />

          <OffCanvasMenu isDisplayed={showOffCanvasMenu} handleCloseMenu={handleCloseMenu}>
            <button onClick={toggleNewDirectoryModal} disabled={isUserInteractionDisabled.isActive}>Create Folder</button>
            <Link to={'/settings'}>Settings</Link>
            <Link to={'/changelog'}>ChangeLog</Link>
            <Link to={'/'}>Home</Link>
          </OffCanvasMenu>

          <NewDirectoryModal showModal={showNewDirectoryModal} toggleNewFolderModal={toggleNewDirectoryModal} createFolderInfo={createFolderInfo}  />
        </main>

        <ErrorToastDisplay errorsArray={[{name: 'Sort File Error', message: createFileInfoError}, {name: 'File Transfer Error', message: fileTransferError}, {name: 'New Folder Error', message: newFolderError}]} />

        <footer>
            <button onClick={createFileInfo} disabled={isUserInteractionDisabled.isActive} >Sort</button>
            <button onClick={toggleNewDirectoryModal} >Create Folder</button>
            <Link to={'/changelog'}>ChangeLog</Link>
        </footer>
      </>
    )
}