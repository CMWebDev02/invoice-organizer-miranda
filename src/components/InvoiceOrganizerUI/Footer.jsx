import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router";
import Stack from "react-bootstrap/esm/Stack";

import styles from "./styles/FooterStyles.module.css";

/**
 * @component Footer component for the organizer pages.
 * @param {string} currentPage - Denoted the page the user is accessing the menu from.
 * @param {boolean} isUserInteractionDisabled - Denotes if the user is allowed to interact with certain buttons.
 * @param {Function} toggleNewDirectoryModal - Toggles the new directory creator modal.
 * @param {Function} createFileInfo - Triggers a file sort get request.
 * @returns {React.JSX.Element}
 */
export function Footer(props) {
  const currentLocation = { lastLocation: props.currentPage };

  return (
    <Row className={`${styles.footerContainer} d-none d-desktopView-flex`}>
      <Col className="p-0">
        <Stack direction="horizontal" gap={2}>
          <Stack direction="horizontal" gap={2}>
            <button
              className="interfaceButton"
              onClick={props.createFileInfo}
              disabled={props.isUserInteractionDisabled}
            >
              Sort
            </button>
            <button
              className="interfaceButton"
              onClick={props.toggleNewDirectoryModal}
            >
              Create Folder
            </button>
          </Stack>
          <Link
            to={"/changelog"}
            className="ms-auto interfaceButton"
            state={currentLocation}
          >
            ChangeLog
          </Link>
        </Stack>
      </Col>
    </Row>
  );
}
