import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DirectoryList({ selectDirectory, selectedDirectory, directoryFilter, directories, sortFile, styles }) {
    let filteredNames = [];

    if(directoryFilter != '') {
        //? The customer array contains arrays that are separated alphabetically, using character codes allows for easy access of the appropriate array.
        const characterIndex = (directoryFilter.toUpperCase()).charCodeAt(0) - 65;
        if (directories[characterIndex] && directories[characterIndex].length != 0) {
            filteredNames = directories[characterIndex].filter(name => {
                //* All strings will be capitalized before being compared to allow for instances in which the user chooses to store folders based on their preferred writing convention,
                //* either all uppercase, lowercase, or a mixture of the two.
                if (name.toUpperCase().startsWith(directoryFilter.toUpperCase())) return true
            });
        }
    }
    
    function quickSort(e) {
        e.stopPropagation()

        sortFile(e);
    }

    return (
        <>
            {filteredNames == 0 ? <h2>No Matching Users</h2> : 
            filteredNames.map(name => <div key={`folder-${name}`} id={name} onClick={selectDirectory} className={`${selectedDirectory == name ? styles.selectedDirectoryOption : styles.directoryOption} w-50 d-flex justify-content-between align-items-center`}>
                                            <p>{name}</p>
                                            <button name={name} onClick={quickSort}><FontAwesomeIcon icon={faArrowUpFromBracket} color="white"/></button>
                                        </div>)}
        </>
    )
}