import Stack from "react-bootstrap/esm/Stack";

export function FilterOptions({alterDisplayedChanges, currentFilter, className, styles}) {
    const filterOptionsArray = [ 'File Transfer', 'Folder Creation', 'Undo Action' ];

    return (
        <Stack direction="horizontal" gap={2} className={`${className} d-flex justify-content-center`}>
            {filterOptionsArray.map(option => <button key={option} onClick={alterDisplayedChanges} name={option} className={`interfaceButton ${currentFilter == option && styles.selectedFilter}`}>{option}</button>)}            
        </Stack>
    )
}