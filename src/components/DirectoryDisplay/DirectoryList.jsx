export function DirectoryList({ selectDirectory, selectedDirectory, directoryFilter, directories, sortFile }) {
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
            filteredNames.map(name => <div key={`folder-${name}`} id={name} onClick={selectDirectory} style={{color: selectedDirectory == name ? 'red' : 'black'}}>{name} <button name={name} onClick={quickSort}>Quick Transfer</button></div>)}
        </>
    )
}