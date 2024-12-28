import { Link } from "react-router";
import { useRef, useState } from "react";

import { CustomerScannedDocumentsChangeLog, AccountsPayablesChangeLog } from "../utilities/localStorage";

import { FilterOptions } from '../components/ChangeLog/UserInteraction/FilterOptions'
import { ChangeLog } from "../containers/ChangeLog";
import { ChangeLogSelector } from "../components/ChangeLog/UserInteraction/ChangeLogSelector";

export function ChangeLogPage({ endPointURL }) {
    const [ currentChangeLog, setCurrentChangeLog ] = useState('customer-scanned-documents')
    const [ filterBy, setFilterBy ] = useState(null);

    const [ isChangeLogCleared, setIsChangeLogCleared ] = useState(false)

    
    function changeFilter(e) {
        if (e.target.name == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(e.target.name)
        }
    }

    // Find a way to trigger a rerender for the change log that is cleared, 
    function resetChangeLog() {
        if (currentChangeLog == 'customer-scanned-documents') CustomerScannedDocumentsChangeLog.resetStorage();
        if (currentChangeLog == 'account-payables') AccountsPayablesChangeLog.resetStorage();
    }

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLogSelector updateSelected={setCurrentChangeLog}/>

            { currentChangeLog == 'customer-scanned-documents' && <ChangeLog changeLogClass={CustomerScannedDocumentsChangeLog} filterBy={filterBy}
                endPoint={`${endPointURL}/customer-scanned-documents`} /> }
            <hr/>
            { currentChangeLog == 'account-payables' && <ChangeLog changeLogClass={AccountsPayablesChangeLog} filterBy={filterBy}
                endPoint={`${endPointURL}/account-payables`} /> }

            <div>
                <button onClick={resetChangeLog}>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

