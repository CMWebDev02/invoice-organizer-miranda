import { Link } from "react-router";
import { useRef, useState } from "react";

import { CustomerScannedDocumentsChangeLog, AccountsPayablesChangeLog } from "../utilities/localStorage";

import { FilterOptions } from '../components/ChangeLog/UserInteraction/FilterOptions'
import { ChangeLog } from "../containers/ChangeLog";
import { ChangeLogSelector } from "../components/ChangeLog/UserInteraction/ChangeLogSelector";

import styles from './styles/ChangeLogPageStyles.module.css'
import Stack from "react-bootstrap/esm/Stack";

export function ChangeLogPage({ endPointURL }) {
    const [ currentChangeLog, setCurrentChangeLog ] = useState('customer-scanned-documents')
    const [ filterBy, setFilterBy ] = useState(null);

    const clearChangeLogRef = useRef(null); 

    
    function changeFilter(e) {
        if (e.target.name == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(e.target.name)
        }
    }

    // Find a way to trigger a rerender for the change log that is cleared, 
    function handleClick() {
        clearChangeLogRef.current();
    }

    return (
        <Stack gap={2} className={`p-1 w-100 h-100`}>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} className='d-flex d-mobileLandscape-none d-tabletPortrait-flex d-tabletLandscape-none'/>

            <ChangeLogSelector updateSelected={setCurrentChangeLog}/>

            <div className={`${styles.changeLogContainer} h-75 overflow-auto`}>
                { currentChangeLog == 'customer-scanned-documents' && <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={CustomerScannedDocumentsChangeLog} filterBy={filterBy}
                    endPoint={`${endPointURL}/customer-scanned-documents`} /> }
                { currentChangeLog == 'account-payables' && <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={AccountsPayablesChangeLog} filterBy={filterBy}
                    endPoint={`${endPointURL}/account-payables`} /> }
            </div>

            <Stack direction="horizontal" className={`${styles.footer} d-flex justify-content-between p-1 mt-auto`} gap={2}>
                <button className={`interfaceButton`} onClick={handleClick}>Clear</button>
                <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} className='d-none d-mobileLandscape-flex d-tabletPortrait-none d-tabletLandscape-flex'/>
                <Link to={'/'} className={`interfaceButton`}>Return</Link>
            </Stack>
        </Stack>
    )
}

