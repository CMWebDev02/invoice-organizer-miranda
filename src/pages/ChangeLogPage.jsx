import { Link } from "react-router";
import { useState, useEffect } from "react";

import { ChangeLogStorage } from "../JavaScript/localStorage";

import { ChangeLog } from "../containers/ChangeLogPage/ChangeLog";
import { FilterOptions } from '../components/ChangeLogPage/FilterOptions'

export function ChangeLogPage() {
    //* This changeLog is the main one, it will store all of the data without being affected by the filter, it will only remove actions when their undo process executed successfully.
    const [ changeLog, setChangeLog ] = useState(ChangeLogStorage.getStorage());
    //* This changeLog will be used to display the actions the user wishes to see and will remove elements depending on the selected filter.
    const [ displayChangeLog, setDisplayChangeLog ] = useState([]);
    const [ filterBy, setFilterBy ] = useState(null);
    
    function changeFilter(filterValue) {
        if (filterValue == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(filterValue)
        }
    }

    useEffect(() => {
        if (changeLog) {
            switch (filterBy) {
                case null: {
                    setDisplayChangeLog(changeLog);
                    break;
                }
                case 'File Transfer': 
                case 'Undo Action':
                case 'Folder Creation': {
                    setDisplayChangeLog(prevChanges => prevChanges.filter(change => change.action == filterBy));
                    break;
                }
            }

            //? Anytime changelog changes, the array's new value is saved in storage.
            ChangeLogStorage.setStorage(changeLog, 5);
        }
    }, [filterBy, setDisplayChangeLog, changeLog])

    function resetChangeLog() {
        ChangeLogStorage.resetStorage();
        setChangeLog(ChangeLogStorage.getStorage());
    }

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLog changeLog={displayChangeLog} alterChangeLog={setChangeLog} />

            <div>
                <button onClick={resetChangeLog}>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

