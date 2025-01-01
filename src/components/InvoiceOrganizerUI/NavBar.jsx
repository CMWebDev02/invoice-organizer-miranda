import { convertFromSpinalTap } from "../../utilities/stringMutations";
import { ChangeLogIcon } from "../ChangeLog/ChangeLogIcon";

export function NavBar(props) {
    const displayName = convertFromSpinalTap(props.pageName);

    return (
        <nav>
            <h1>{displayName}</h1>
            <ChangeLogIcon isChanging={props.isChanging} changeResult={props.lastChange} />

            <button onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
            <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
            <button onClick={props.handleShowMenu}>Menu</button>
        </nav>
    )
}