import { Link, useNavigate } from "react-router";
import Stack from "react-bootstrap/esm/Stack";

import styles from "./styles/HomePage.module.css";
import { useContext, useEffect } from "react";
import { UserLoggedInContext } from "../utilities/userContext";

/**
 * @component Renders the home page which contains the various links to the other pages of the project.
 * @returns {React.JSX.Element}
 */
export function HomePage() {
  const navigation = useNavigate();
  const isUserLoggedIn = useContext(UserLoggedInContext);
  
  // Redirects the user using the navigation function in the event they do not have a valid signin session.
  useEffect(() => {
    if(!isUserLoggedIn) navigation('/login')
  }, [navigation, isUserLoggedIn])

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
        </Stack>

        <Stack className="w-100" gap={3}>
          <h1>User Storage</h1>
          <Link  to={"/changeLog"} className="interfaceButton">
            Change Log
          </Link>
          <Link to={"/settings"} className="interfaceButton">
            Settings
          </Link>
        </Stack>
      </Stack>
    </div>
  );
}
