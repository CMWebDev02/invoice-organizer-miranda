import { Link } from "react-router";

export function Footer(props) {

    return (
        <footer>
            <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
            <button onClick={props.toggleNewDirectoryModal} >Create Folder</button>
            <Link to={'/changelog'}>ChangeLog</Link>
        </footer>
    )
}