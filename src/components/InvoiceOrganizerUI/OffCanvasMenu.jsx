import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router'

export function OffCanvasMenu(props) {

    return (
        <Offcanvas show={props.isDisplayed} onHide={props.handleCloseMenu} placement='end'>
            <Offcanvas.Header>
                <button onClick={props.handleCloseMenu}>Close</button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row>
                        <button className='d-tabletPortrait-none' onClick={props.toggleNewDirectoryModal} disabled={props.isUserInteractionDisabled}>Create Folder</button>
                        <Link to={'/changelog'} className='d-desktopView-none'>ChangeLog</Link>
                        <Link to={'/settings'}>Settings</Link>
                        <Link to={'/'}>Home</Link>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    )
}