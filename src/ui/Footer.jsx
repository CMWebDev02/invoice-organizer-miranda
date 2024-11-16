export function Footer({ sortFile, isInteractionDisabled }) {
    return (
        <footer>
            <button onClick={sortFile} disabled={isInteractionDisabled} >Sort</button>
            <button>Create Folder</button>
            <button>Changelog</button>
        </footer>
    )
}