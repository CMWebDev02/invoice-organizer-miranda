import Col from "react-bootstrap/esm/Col"
import { convertFromSpinalTap } from "../../utilities/stringMutations";
import { ChangeLogIcon } from "../ChangeLog/ChangeLogIcon";
import Row from "react-bootstrap/esm/Row";
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";

import styles from './styles/NavBarStyles.module.css'

export function NavBar(props) {
    const displayName = convertFromSpinalTap(props.pageName);

    return (
        <Row className={`${styles.navBar} p-2`}>
            <Col className="p-0 h-auto">
                <Stack direction="horizontal" gap={2} className="h-auto">
                    <FontAwesomeIcon icon={faArrowDownShortWide} className={`${styles.icon} d-none d-mobileLandscape-flex`}/>
                    <h1 className={` ${styles.projectTitle}`}>{displayName}</h1>
                    <ChangeLogIcon isChanging={props.isChanging} changeResult={props.lastChange} className={styles.icon} />
                    <Stack className={`ms-auto`} direction="horizontal" gap={1}>
                        <button className="d-none d-tabletPortrait-flex d-desktopView-none interfaceButton" onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                        <button className="d-desktopView-none interfaceButton" onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                        <button className="interfaceButton" onClick={props.handleShowMenu}>Menu</button>
                    </Stack>
                </Stack>
            </Col>
        </Row>
    )
}