import { ChangeInfo } from './ChangeInfo.jsx'
import { UseUndoFetch } from "../../hooks/UseUndoFetch.jsx";

export function ChangeLogDisplay({ changeLog, alterChangeLog }) {
    const { isLoading: isUndoingAction, errorOccurred: undoActionError, triggerFetchPostRequest: triggerChangeLogPostRequest } = UseUndoFetch({fetchURLBase: 'http://localhost:3000/undoAction', alterChangeLog, associateFetchKey: ''})

    function undoChange(undoObj, id, action) {
        let userResult = confirm('Are You Sure You Want to Undo This Change?')
        if (!userResult) return;
        
        triggerChangeLogPostRequest({
            action: action,
            actionId: id,
            undoInfo: JSON.stringify(undoObj)
        })
    }


    return (
        <div>
            {undoActionError && <h3>{undoActionError}</h3>}
            {changeLog.length == 0 && <h2>No Changes To Display</h2>}
            {changeLog && changeLog.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} isButtonDisabled={isUndoingAction} />)}
        </div>
    )
} 