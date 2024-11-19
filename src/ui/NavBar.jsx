import { ChangeLogIcon } from "../containers/NavBar/ChangeLogIcon"

export function NavBar({ sortFile, isInteractionDisabled, isChanging, changeResult, toggleNewFolderModal }) {
    return (
        <nav>
        <h1>Invoice Organizer</h1>
        <ChangeLogIcon isChanging={isChanging} changeResult={changeResult} />

        <button onClick={sortFile} disabled={isInteractionDisabled}>Sort</button>
        <button onClick={toggleNewFolderModal}>Create Folder</button>
        <button>Menu</button>
      </nav>
    )
}