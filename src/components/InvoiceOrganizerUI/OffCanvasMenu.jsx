import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from "react-bootstrap/esm/Col"
import Stack from 'react-bootstrap/esm/Stack'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router'

import styles from './styles/OffCanvasMenuStyles.module.css'

export function OffCanvasMenu(props) {

    return (
        <Offcanvas show={props.isDisplayed} onHide={props.handleCloseMenu} placement='end'>
            <Offcanvas.Header>
                <button onClick={props.handleCloseMenu} className='ms-auto'>Close</button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row className={styles.offCanvasBodyContainer}>
                            <Stack gap={2} className='p-0'>
                                <button className='d-tabletPortrait-none' onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                                <Link to={'/changelog'} className='d-desktopView-none'>ChangeLog</Link>
                                <Link to={'/settings'}>Settings</Link>
                                <Link to={'/'}>Home</Link>
                            </Stack>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    )
}