import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stack from "react-bootstrap/esm/Stack";

export function ChangeInfo({ info, undoChange, isButtonDisabled, styles, showUndoButtons }) {
    let isSuccessful = info.result == 'Succeeded' ? true : false;

    return (
        <Stack direction="horizontal" className={`${isSuccessful ? styles.successfulEntry : styles.failedEntry} ${styles.changeLogEntry}`} gap={1} >
            <p className="w-auto">{info.message}</p>
            {isSuccessful && info.action != 'Undo Action' && showUndoButtons && 
            <button className="h-100 ms-auto" onClick={() => undoChange(info.undoInfo, info.id, info.action)} disabled={isButtonDisabled}>
                <FontAwesomeIcon icon={faRotateLeft} color="white"/>
            </button>}
        </Stack>
    )
}