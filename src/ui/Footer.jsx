export function Footer({ sortFile }) {
    return (
        <footer>
            <button onClick={sortFile} >Sort</button>
            <button>Create Folder</button>
            <button>Changelog</button>
        </footer>
    )
}