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
        <Row className={styles.navBar}>
            <Col className="m-0">
                <Stack direction="horizontal" gap={2}>
                    <FontAwesomeIcon icon={faArrowDownShortWide} className={styles.icon}/>
                    <h1 className={` ${styles.projectTitle}`}>{displayName}</h1>
                    <ChangeLogIcon isChanging={props.isChanging} changeResult={props.lastChange} className={styles.icon} />
                    <Stack className={`ms-auto ${styles.buttonsContainer}`} direction="horizontal" gap={1}>
                        <button className="d-none d-tabletPortrait-flex d-desktopView-none" onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                        <button className="d-desktopView-none" onClick={props.createFileInfo} disabled={props.isUserInteractionDisabled}>Sort</button>
                        <button onClick={props.handleShowMenu}>Menu</button>
                    </Stack>
                </Stack>
            </Col>
        </Row>
    )
}