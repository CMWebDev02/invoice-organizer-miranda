export function Footer({ sortFile, isInteractionDisabled, toggleNewFolderModal }) {
    return (
        <footer>
            <button onClick={sortFile} disabled={isInteractionDisabled} >Sort</button>
            <button onClick={toggleNewFolderModal} >Create Folder</button>
            <button>Changelog</button>
        </footer>
    )
}