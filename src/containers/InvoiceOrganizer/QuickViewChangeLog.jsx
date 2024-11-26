import { useEffect, useState } from "react";
import { ChangeLog } from "../ChangeLogPage/ChangeLog";

export function QuickViewChangeLog({ changeLog, alterChangeLog }) {
    const [ changesToDisplay, setChangesToDisplay ] = useState([]);

    useEffect(() => {
        // Will display only 10 items for now, set this up to utilize a settings object to see how many actions the user wants to see
        // at a time on the page.
        setChangesToDisplay(changeLog.slice(0, 9))
    }, [changeLog])

    return (
        <ChangeLog changeLog={changesToDisplay} alterChangeLog={alterChangeLog} showFilters={false} />
    )
} 