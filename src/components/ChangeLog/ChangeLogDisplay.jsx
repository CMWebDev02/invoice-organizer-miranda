import { ChangeInfo } from './ChangeInfo.jsx'
import { UseUndoFetch } from "../../hooks/UseUndoFetch.jsx";

export function ChangeLogDisplay({ endPoint, changeLog, alterChangeLog, showUndoButtons }) {
    const { isLoading: isUndoingAction, errorOccurred: undoActionError, triggerFetchPostRequest: triggerChangeLogPostRequest } = UseUndoFetch({fetchURLBase: `${endPoint}/undo-action`, alterChangeLog})

    function undoChange(undoObj, id, action) {
        let userResult = confirm('Are You Sure You Want to Undo This Change?')
        if (!userResult) return;
        
        triggerChangeLogPostRequest({
            action: action,
            actionId: id,
            undoInfo: JSON.stringify(undoObj)
        })
    }

    const RenderChangeLog = () => {
        return changeLog.length === 0 ? 
            <h2>No Changes To Display</h2> : 
            changeLog.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} 
                isButtonDisabled={isUndoingAction} showUndoButtons={showUndoButtons}/>)
    }


    return (
        <>
            {undoActionError && <h3>{undoActionError}</h3>}
            <RenderChangeLog />
        </>
    )
} 