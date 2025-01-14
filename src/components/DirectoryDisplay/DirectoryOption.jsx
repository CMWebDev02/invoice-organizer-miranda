import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DirectoryOption({name, selectDirectory, style, quickSort, index}) {
    return (
        <div key={`folder-${name}`} id={name} onClick={selectDirectory} className={`${style} w-50 d-flex justify-content-between align-items-center`}>
            <p>{name}</p>
            <button name={name} onClick={quickSort}><FontAwesomeIcon icon={faArrowUpFromBracket} color="white"/></button>
        </div>
    )
}