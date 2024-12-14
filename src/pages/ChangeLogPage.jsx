import { Link } from "react-router";
import { useState } from "react";

import { InvoiceOrganizerChangeLog } from "../utilities/localStorage";

import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";
import { FilterOptions } from '../components/ChangeLog/FilterOptions'

export function ChangeLogPage() {
    //* This changeLog is the main one, it will store all of the data without being affected by the filter, it will only remove actions when their undo process executed successfully.
    const [ changeLog, setChangeLog ] = useState(InvoiceOrganizerChangeLog.getStorage());
    //* This changeLog will be used to display the actions the user wishes to see and will remove elements depending on the selected filter.
    const [ filterBy, setFilterBy ] = useState(null);

    const displayChangeLog = filterBy == null ? [...changeLog] : changeLog.filter(change => change.action == filterBy);
    
    function changeFilter(e) {
        if (e.target.name == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(e.target.name)
        }
    }

    function resetChangeLog() {
        InvoiceOrganizerChangeLog.resetStorage();
        setChangeLog(InvoiceOrganizerChangeLog.getStorage());
    }

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLogDisplay changeLog={displayChangeLog} alterChangeLog={setChangeLog} />

            <div>
                <button onClick={resetChangeLog}>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

