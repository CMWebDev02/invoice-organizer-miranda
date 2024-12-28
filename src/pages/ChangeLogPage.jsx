import { Link } from "react-router";
import { useState } from "react";

import { CustomerScannedDocumentsChangeLog, AccountsPayablesChangeLog } from "../utilities/localStorage";

import { FilterOptions } from '../components/ChangeLog/FilterOptions'
import { ChangeLog } from "../containers/ChangeLog";

export function ChangeLogPage({ endPointURL }) {
    const [ filterBy, setFilterBy ] = useState(null);

    
    function changeFilter(e) {
        if (e.target.name == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(e.target.name)
        }
    }

    function resetChangeLog() {
        console.log('test')
    }

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLog changeLogClass={CustomerScannedDocumentsChangeLog} filterBy={filterBy} endPoint={`${endPointURL}/customer-scanned-documents`} />
            <hr/>
            <ChangeLog changeLogClass={AccountsPayablesChangeLog} filterBy={filterBy} endPoint={`${endPointURL}/account-payables`} />

            <div>
                <button onClick={resetChangeLog}>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

