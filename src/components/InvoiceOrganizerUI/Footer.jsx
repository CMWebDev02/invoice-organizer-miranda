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
                        <button onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                        <button onClick={props.toggleNewDirectoryModal} >Create Folder</button>
                        <Link to={'/changelog'} className="ms-auto">ChangeLog</Link>
                    </Stack>
                </Col>
            </Row>
    )
}