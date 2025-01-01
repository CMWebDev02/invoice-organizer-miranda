import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router";

export function Footer(props) {

    return (
        <footer>
            <Row>
                <Col xs={10}>
                    <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                    <button onClick={props.toggleNewDirectoryModal} >Create Folder</button>
                </Col>
                <Col xs={2}>
                    <Link to={'/changelog'}>ChangeLog</Link>
                </Col>
            </Row>
        </footer>
    )
}