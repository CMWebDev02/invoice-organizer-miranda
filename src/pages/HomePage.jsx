import { Link, useNavigate } from "react-router";
import Stack from "react-bootstrap/esm/Stack";

import styles from "./styles/HomePage.module.css";
import { useCookies } from "react-cookie";

/**
 * @component Renders the home page which contains the various links to the other pages of the project and the method to invalidate a user session.
 * @returns {React.JSX.Element}
 */
export function HomePage() {
  const [cookies, setCookies, removeCookie] = useCookies(["account"]);
  const navigate = useNavigate();

  /**
   * @function Invalidates the stored user session by removing the associated cookie.
   * @returns {void}
   */
  function handleSignOut() {
    removeCookie("account");
    navigate("/login");
  }

  return (
    <div className={`${styles.mainContainer} p-3 h-100`}>
      <Stack
        className={`${styles.linksContainer} h-100 h-mobileLandscape-75 h-tabletPortrait-50 w-100 w-mobileLandscape-50 p-3`}
        gap={2}
      >
        <Stack className="w-100" gap={3}>
          <h1>Organizers</h1>
          <Link to={"customer-scanned-documents"} className="interfaceButton">
            Customer Scanned Documents
          </Link>
          <Link to={"accounts-payables"} className="interfaceButton">
            Accounts Payables
          </Link>
          <Link to={"/changeLog"} className="interfaceButton">
            Change Log
          </Link>
        </Stack>

        <hr />

        <Stack className="w-100" gap={3}>
          <h1>Account Settings</h1>
          <Stack className="w-100" gap={2}>
            <Link to={"/settings"} className="interfaceButton">
              Settings
            </Link>
            <Link to={"/register"} className="interfaceButton">
              Create New Account
            </Link>
            <button className="interfaceButton" onClick={handleSignOut}>
              Sign Out
            </button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
