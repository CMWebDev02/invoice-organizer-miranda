import { useLocation, useNavigate } from "react-router";
import { ChangeLog } from "../containers/ChangeLogPage/ChangeLog";
import { useState } from "react";

export function ChangeLogPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [ changeLog, setChangeLog ] = useState([])

    function returnToLastPage() {
        navigate(state?.lastPage || '/')
    }

    console.log(state)

    return (
        <>
            <ChangeLog changeLog={changeLog} alterChangeLog={setChangeLog} showFilters={true} />

            <div>
                <button>Clear</button>
                <button onClick={returnToLastPage}>Return</button>
            </div>
        </>
    )
}

