import { useRef } from "react";
import { LoginInput } from "../components/UserLogin/LoginInput";
import { UseAccountRequest } from "../hooks/UseAccountRequest";
import { Link } from "react-router";

import styles from "./styles/LoginPageStyles.module.css";

/**
 * @component Renders the login page and handles the logic for storing the user session information received from the backend.
 * @param {string} endPointURL - Defines the URL for the project's backend.
 * @returns {React.JSX.Element}
 */
export function Login({ endPointURL }) {
  const userNameRef = useRef(null);
  const userKeyRef = useRef(null);
  const {
    isLoading,
    error,
    mutateAsync: triggerLogin,
  } = UseAccountRequest({ endPoint: endPointURL, isNewUser: false });

  /**
   * @function Validates the username and userkey values and triggers the account post request.
   * @param {type} variable - description .
   * @returns
   */
  function handleLogIn(e) {
    e.preventDefault();

    if (userKeyRef.current.value !== "" && userNameRef.current.value !== "") {
      triggerLogin({
        accountName: userNameRef.current.value,
        accountKey: userKeyRef.current.value,
      });
    }
  }

  return (
    <div
      className={`d-flex justify-content-center align-content-center flex-wrap w-100 h-100 p-3`}
    >
      <form
        onSubmit={handleLogIn}
        className={`${styles.loginContainer} h-75 h-tabletPortrait-50 w-100 w-mobileLandscape-75 w-tabletPortrait-50 p-3`}
      >
        <h1>Login</h1>
        {error && <h2>{error.message}</h2>}
        <LoginInput
          type={"text"}
          inputRef={userNameRef}
          labelName={`Username`}
          isDisabled={isLoading}
        />
        <LoginInput
          type={"password"}
          inputRef={userKeyRef}
          labelName={`Password`}
          isDisabled={isLoading}
        />
        <input type="submit" value={"Sign In"} className="interfaceButton" />
        <Link to="/register" className="interfaceButton">
          Create New Account
        </Link>
      </form>
    </div>
  );
}
