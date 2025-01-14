import { ChangeInfo } from './ChangeInfo.jsx'
import { UseUndoFetch } from "../../hooks/UseUndoFetch.jsx";
import styles from './styles/ChangeLogStyles.module.css';

export function ChangeLogDisplay({ endPoint, changeLog, alterChangeLog }) {
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


    return (
        <>
            {undoActionError && <h3>{undoActionError}</h3>}
            {changeLog.length == 0 && <h2>No Changes To Display</h2>}
            {changeLog && changeLog.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} isButtonDisabled={isUndoingAction} styles={styles} />)}
        </>
    )
} 