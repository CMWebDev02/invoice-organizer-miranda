import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DirectoryOption({name, selectDirectory, style, quickSort, index, showQuickTransferButtons}) {
    return (
        <div key={`folder-${name}`} id={name} onClick={selectDirectory} className={`${style} w-50 d-flex justify-content-between align-items-center`}>
            <p>
                {index <= 8 && <span>{index + 1}. </span>}
                {name}
            </p>
            {showQuickTransferButtons && <button name={name} onClick={quickSort}><FontAwesomeIcon icon={faArrowUpFromBracket} color="white"/></button>}
        </div>
    )
}