import Col from "react-bootstrap/esm/Col"
import { convertFromSpinalTap } from "../../utilities/stringMutations";
import { ChangeLogIcon } from "../ChangeLog/ChangeLogIcon";
import Row from "react-bootstrap/esm/Row";

export function NavBar(props) {
    const displayName = convertFromSpinalTap(props.pageName);

    return (
        <nav>
            <Row>
                <Col mobilePortrait={5}>
                    <h1>{displayName}</h1>
                </Col>
                <Col mobilePortrait={1}>
                    <ChangeLogIcon isChanging={props.isChanging} changeResult={props.lastChange} />
                </Col>
                <Col mobilePortrait={6}>
                    <button onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                    <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                    <button onClick={props.handleShowMenu}>Menu</button>
                </Col>
            </Row>
        </nav>
    )
}