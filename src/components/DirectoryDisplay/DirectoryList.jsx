
import { useEffect } from "react";
import { DirectoryOption } from "./DirectoryOption";
import styles from './styles/DirectoryDisplayStyles.module.css'

export function DirectoryList({ selectDirectory, selectedDirectory, directoryFilter, directories, sortFile, showQuickTransferButtons }) {
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

    useEffect(() => {
        function quickSelect(e) {
            if (e.keyCode >= 49 && e.keyCode <= 57 && !e.shiftKey) {
                let numberKey = e.keyCode - 49;
                if (filteredNames.length > numberKey) {
                    selectDirectory(filteredNames[numberKey])
                }
            }
        }

        addEventListener('keydown', quickSelect)

        return () => {
            removeEventListener('keydown', quickSelect)
        }
    }, [filteredNames])
    
    function quickSort(e) {
        e.stopPropagation()

        sortFile(e);
    }

    return (
        <>
            {filteredNames == 0 ? <h2>No Matching Users</h2> : 
            filteredNames.map((name, index) => <DirectoryOption key={name} index={index} selectDirectory={selectDirectory} name={name} style={selectedDirectory == name ? styles.selectedDirectoryOption : styles.directoryOption} quickSort={quickSort} showQuickTransferButtons={showQuickTransferButtons} />)}
        </>
    )
}