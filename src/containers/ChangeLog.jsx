import { useEffect, useState } from "react";
import { ChangeLogDisplay } from "../components/ChangeLog/ChangeLogDisplay";

export function ChangeLog({ clearChangeLogRef, changeLogClass, filterBy, endPoint }) {
    //* This changeLog is the main one, it will store all of the data without being affected by the filter, it will only remove actions when their undo process executed successfully.
    const [ changeLog, setChangeLog ] = useState(changeLogClass.getStorage());

    function clearChangeLog() {
        changeLogClass.resetStorage();
        //* The getStorage class method is called to reinitialize the changelog in local storage once it is removed.
        setChangeLog(changeLogClass.getStorage())
    }

    clearChangeLogRef.current = clearChangeLog;
    
    //* This changeLog will be used to display the actions the user wishes to see and will remove elements depending on the selected filter.
    const displayChangeLog = filterBy === null ? [...changeLog] : changeLog.filter(change => change.action === filterBy);

    return (
        <>
            <ChangeLogDisplay changeLog={displayChangeLog} alterChangeLog={setChangeLog} endPoint={endPoint} showUndoButtons={true} />
        </>

    )
}