import { Link } from "react-router";

export function Footer({ sortFile, isInteractionDisabled, toggleNewFolderModal, currentChangeLog }) {


    return (
        <footer>
            <button onClick={sortFile} disabled={isInteractionDisabled} >Sort</button>
            <button onClick={toggleNewFolderModal} >Create Folder</button>
            <Link to={'/changelog'} >ChangeLog</Link>
        </footer>
    )
}