import { Link } from "react-router";
import { useRef, useState } from "react";

import { CustomerScannedDocumentsChangeLog, AccountsPayablesChangeLog } from "../utilities/localStorage";

import { FilterOptions } from '../components/ChangeLog/UserInteraction/FilterOptions'
import { ChangeLog } from "../containers/ChangeLog";
import { ChangeLogSelector } from "../components/ChangeLog/UserInteraction/ChangeLogSelector";

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
        console.log('test')
    }

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLogSelector updateSelected={setCurrentChangeLog}/>

            { currentChangeLog == 'customer-scanned-documents' && <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={CustomerScannedDocumentsChangeLog} filterBy={filterBy}
                endPoint={`${endPointURL}/customer-scanned-documents`} /> }
            <hr/>
            { currentChangeLog == 'account-payables' && <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={AccountsPayablesChangeLog} filterBy={filterBy}
                endPoint={`${endPointURL}/account-payables`} /> }

            <div>
                <button onClick={handleClick}>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

