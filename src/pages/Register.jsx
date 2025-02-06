import { useRef } from "react";
import { UseAccountRequest } from "../hooks/UseAccountRequest";
import { LoginInput } from "../components/UserLogin/LoginInput";
import { Link } from "react-router";

import styles from "./styles/RegisterPageStyles.module.css";

/**
 * @component Renders the register page and handles the logic for generating a new user account and validating a new user session.
 * @param {string} endPointURL - Defines the URL for the project's backend.
 * @returns {React.JSX.Element}
 */
export function Register({ endPointURL }) {
  const userNameRef = useRef(null);
  const userKeyRef = useRef(null);
  const {
    isLoading,
    error,
    mutateAsync: triggerLogin,
  } = UseAccountRequest({ endPoint: endPointURL, isNewUser: true });

  /**
   * @function Validates the username and userkey values and triggers the account post request.
   * @param {type} variable - description .
   * @returns
   */
  function handleAccountCreation(e) {
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
        onSubmit={handleAccountCreation}
        className={`${styles.registerContainer} h-75 h-tabletPortrait-50 w-100 w-mobileLandscape-75 w-tabletPortrait-50 p-3`}
      >
        <h1>Register</h1>
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
        <input
          type="submit"
          value={"Create Account"}
          className="interfaceButton"
        />
        <Link to="/login" className="interfaceButton w-100">
          Use Existing Account
        </Link>
      </form>
    </div>
  );
}
