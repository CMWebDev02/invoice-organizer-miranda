import Stack from "react-bootstrap/esm/Stack";
import styles from '../styles/ChangeLogStyles.module.css'

export function FilterOptions({alterDisplayedChanges, currentFilter, className}) {
    const filterOptionsArray = [ 'File Transfer', 'Folder Creation', 'Undo Action' ];

    const RenderFilterOptions = () => {
        return filterOptionsArray.map(option => <button key={option} onClick={alterDisplayedChanges} name={option} 
                className={`${currentFilter == option && styles.selectedFilter} interfaceButton`}>{option}</button>)
    }

    return (
        <Stack direction="horizontal" gap={2} className={`${className} d-flex justify-content-center`}>
            <RenderFilterOptions />
        </Stack>
    )
}