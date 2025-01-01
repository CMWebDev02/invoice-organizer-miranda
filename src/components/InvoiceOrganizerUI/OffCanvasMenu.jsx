import Offcanvas from 'react-bootstrap/Offcanvas'

export function OffCanvasMenu({ isDisplayed, handleCloseMenu, children}) {

    return (
        <Offcanvas show={isDisplayed} onHide={handleCloseMenu} placement='end'>
            <Offcanvas.Header>
                <Offcanvas.Title> Menu </Offcanvas.Title>
                <button onClick={handleCloseMenu}>Close</button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    )
}