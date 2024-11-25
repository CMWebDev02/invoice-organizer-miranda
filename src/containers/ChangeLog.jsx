import { useState } from "react";
import { ChangeInfo } from "../components/ChangeLog/ChangeInfo";
import { UseFetchPostRequest } from "../hooks/UseFetchPostRequest";

export function ChangeLog({ changeLog, alterChangeLog }) {
    const [ undoChangeInfo, setUndoChangeInfo ] = useState(null);

    const { isLoading: isUndoingAction, errorOccurred: undoActionError, fetchData: undoActionData } = UseFetchPostRequest({fetchURLBase: 'http://localhost:3000/undoAction', queries: undoChangeInfo})



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
            {changeLog && changeLog.map(change => <ChangeInfo key={`changeLog-item-${change.id}`} info={change} undoChange={undoChange} />)}
        </div>
    )
} 