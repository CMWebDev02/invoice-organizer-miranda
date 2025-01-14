import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router";
import Stack from "react-bootstrap/esm/Stack";

import styles from './styles/FooterStyles.module.css'

export function Footer(props) {
    return (
            <Row className={`${styles.footerContainer} d-none d-desktopView-flex`}>
                <Col className="p-0">
                    <Stack direction="horizontal" gap={2}>
                        <Stack direction="horizontal" gap={2}>
                            <button className="interfaceButton"  onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                            <button className="interfaceButton" onClick={props.toggleNewDirectoryModal} >Create Folder</button>
                        </Stack>
                        <Link to={'/changelog'} className="ms-auto interfaceButton">ChangeLog</Link>
                    </Stack>
                </Col>
            </Row>
    )
}