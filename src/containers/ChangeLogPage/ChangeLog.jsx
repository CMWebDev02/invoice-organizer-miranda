import { useEffect, useState } from "react";
import { ChangeInfo } from '../../components/ChangeLog/ChangeInfo.jsx'
import { UseFetchPostRequest } from "../../hooks/UseFetchPostRequest.jsx";
import { FilterOptions } from "./FilterOptions.jsx";

export function ChangeLog({ changeLog, alterChangeLog, showFilters }) {
    const [ undoChangeInfo, setUndoChangeInfo ] = useState(null);
    const [ changesToDisplay, setChangesToDisplay ] = useState([]);
    const [ filterBy, setFilterBy ] = useState(null)

    const { isLoading: isUndoingAction, errorOccurred: undoActionError, fetchResponse: undoActionData } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/undoAction', queries: undoChangeInfo})

    useEffect(() => {
        if (changeLog) {
            switch (filterBy) {
                case null: {
                    setChangesToDisplay(changeLog);
                    break;
                }
                case 'File Transfer': 
                case 'Undo Action':
                case 'Folder Creation': {
                    setChangesToDisplay(prevChanges => prevChanges.filter(change => change.action == filterBy));
                    break;
                }
            }

        }
    }, [filterBy, changesToDisplay, changeLog])

    useEffect(() => {
        if (undoActionData) {
            alterChangeLog(prevChanges => {
                let changes = [ undoActionData, ...prevChanges ];
                if (undoActionData.result == "Succeeded") {
                    changes = changes.filter(change => change.id != undoActionData.undoneActionId);
                }

                return changes;
            })
        }
    }, [undoActionData, alterChangeLog])

    function changeFilter(filterValue) {
        if (filterValue == filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(filterValue)
        }
    }

    function undoChange(undoObj, id, action) {
        let userResult = confirm('Are You Sure You Want to Undo This Change?')
        if (!userResult) return;
        
        setUndoChangeInfo({
            action: action,
            actionId: id,
            undoInfo: JSON.stringify(undoObj)
        })
    }

    return (
        <div>
            {showFilters && <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} />}
            {undoActionError && <h3>{undoActionError}</h3>}
            {changesToDisplay.length == 0 && <h2>No Changes To Display</h2>}
            {changesToDisplay && changesToDisplay.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} isButtonDisabled={isUndoingAction} />)}
        </div>
    )
} 