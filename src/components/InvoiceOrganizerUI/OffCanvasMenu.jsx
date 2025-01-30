import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router";

import styles from "./styles/OffCanvasMenuStyles.module.css";

/**
 * @component Main menu component for the organizer pages.
 * @param {boolean} isDisplayed - Denotes if the menu should be displayed.
 * @param {string} currentPage - Denoted the page the user is accessing the menu from.
 * @param {Function} handleCloseMenu - Closes the menu.
 * @param {Function} toggleNewDirectoryModal - Toggles the new directory creator modal.
 * @param {boolean} isUserInteractionDisabled - Denotes if the user is allowed to interact with certain buttons.
 * @returns {React.JSX.Element}
 */
export function OffCanvasMenu(props) {
  // Creates an state object that contains sets the last page the user visited to their current one
  // in the case the user navigates away, they can return here instead of being redirected to home.
  const currentLocation = { lastLocation: props.currentPage };

  return (
    <Offcanvas
      show={props.isDisplayed}
      onHide={props.handleCloseMenu}
      placement="end"
      className={`${styles.offCanvasMenu} gap-2`}
    >
      <Offcanvas.Header className="p-0">
        <button
          onClick={props.handleCloseMenu}
          className="interfaceButton ms-auto"
        >
          Close
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-2">
        <Container>
          <Row className={styles.offCanvasBodyContainer}>
            <Stack gap={2} className="p-0">
              <button
                className={`${styles.buttonElement} interfaceButton d-tabletPortrait-none`}
                onClick={props.toggleNewDirectoryModal}
                disabled={props.isUserInteractionDisabled}
              >
                Create Folder
              </button>
              <Link
                to={"/changelog"}
                className={`${styles.buttonElement} interfaceButton d-desktopView-none`}
                state={currentLocation}
              >
                ChangeLog
              </Link>
              <Link
                to={"/settings"}
                className={`${styles.buttonElement} interfaceButton`}
                state={currentLocation}
              >
                Settings
              </Link>
              <Link
                to={"/"}
                className={`${styles.buttonElement} interfaceButton`}
              >
                Home
              </Link>
            </Stack>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
