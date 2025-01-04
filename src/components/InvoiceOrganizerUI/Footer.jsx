import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router";

export function Footer(props) {

    return (
            <Row className="d-none d-desktopView-flex">
                <Col mobilePortrait={10}>
                    <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                    <button onClick={props.toggleNewDirectoryModal} >Create Folder</button>
                </Col>
                <Col mobilePortrait={2}>
                    <Link to={'/changelog'}>ChangeLog</Link>
                </Col>
            </Row>
    )
}