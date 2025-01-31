import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useEffect, useRef, useState } from "react";

/**
 * @component Renders an interactive icon that changes color based the result of the latest changelog entry and will display information for it as well upon being clicked by the user.
 * @param {boolean} isChanging - Denotes if a changelog entry is being made.
 * @param {Object} changeResult - Object containing information for the latest changelog entry.
 * @param {string} className - Style object property that handles styling the component.
 * @returns {React.JSX.Element}
 */
export function ChangeLogIcon({ isChanging, changeResult, className }) {
  // Sets the default icon color to black if there are no changelog entries.
  const [iconColor, setIconColor] = useState("black");
  const lastChangeResultTarget = useRef(null);

  // Updates the current color of the icon based on the result of the latest changelog entry, a successful entry will render it green and a failed one will render it red.
  useEffect(() => {
    if (changeResult?.result)
      setIconColor(changeResult?.result === "Succeeded" ? "green" : "red");
  }, [changeResult]);

  /**
   * @component Renders the tool tip pop up to display the changelog entry's information to the user.
   * @param {Object} props - Object containing the necessary properties to display the tooltip in the appropriate area on the page.
   * @returns {React.JSX.Element}
   */
  const showChangeLogToolTip = (props) => (
    <Tooltip id={`transfer-tooltip`} {...props}>
      {changeResult?.message}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={showChangeLogToolTip}
      trigger="click"
    >
      <FontAwesomeIcon
        icon={faFile}
        ref={lastChangeResultTarget}
        color={iconColor}
        shake={isChanging}
        className={className}
      />
    </OverlayTrigger>
  );
}
