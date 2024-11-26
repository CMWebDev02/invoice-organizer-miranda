import { useNavigate } from "react-router"

export function Footer({ sortFile, isInteractionDisabled, toggleNewFolderModal, currentChangeLog }) {
    const navigate = useNavigate()

    function navigateToChangeLogPage() {
        let stateObj = {lastPage: '/'}
        navigate('/changelog', {state: stateObj})
    }

    return (
        <footer>
            <button onClick={sortFile} disabled={isInteractionDisabled} >Sort</button>
            <button onClick={toggleNewFolderModal} >Create Folder</button>
            <button onClick={navigateToChangeLogPage}>Changelog</button>
        </footer>
    )
}