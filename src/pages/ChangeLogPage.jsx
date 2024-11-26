import { Link } from "react-router";
import { useState, useEffect } from "react";

import { ChangeLog } from "../containers/ChangeLogPage/ChangeLog";
import { FilterOptions } from '../components/ChangeLogPage/FilterOptions'

export function ChangeLogPage() {
    const [ changeLog, setChangeLog ] = useState([])
    const [ filterBy, setFilterBy ] = useState(null)
    
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
                    setChangeLog(changeLog);
                    break;
                }
                case 'File Transfer': 
                case 'Undo Action':
                case 'Folder Creation': {
                    setChangeLog(prevChanges => prevChanges.filter(change => change.action == filterBy));
                    break;
                }
            }

        }
    }, [filterBy, setChangeLog, changeLog])

    return (
        <>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />

            <ChangeLog changeLog={changeLog} alterChangeLog={setChangeLog} />

            <div>
                <button>Clear</button>
                <Link to={'/'} >Return</Link>
            </div>
        </>
    )
}

