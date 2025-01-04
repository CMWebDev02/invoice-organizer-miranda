import Col from "react-bootstrap/esm/Col"
import { convertFromSpinalTap } from "../../utilities/stringMutations";
import { ChangeLogIcon } from "../ChangeLog/ChangeLogIcon";
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";

export function NavBar(props) {
    const displayName = convertFromSpinalTap(props.pageName);

    return (
        <Row>
            <Col className="d-none d-mobileLandscape-flex" mobileLandscape={1} >
                <FontAwesomeIcon icon={faArrowDownShortWide} />
            </Col>
            <Col mobilePortrait={7}>
                <h1>{displayName}</h1>
            </Col>
            <Col mobilePortrait={1}>
                <ChangeLogIcon isChanging={props.isChanging} changeResult={props.lastChange} />
            </Col>

            <Col mobilePortrait={3}>
                <button className="d-none d-tabletPortrait-flex d-desktopView-none" onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                <button className="d-desktopView-none" onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                <button onClick={props.handleShowMenu}>Menu</button>
            </Col>
        </Row>
    )
}