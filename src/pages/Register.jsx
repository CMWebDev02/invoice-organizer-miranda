import { useRef } from "react";
import { UseAccountRequest } from "../hooks/UseAccountRequest";
import Stack from "react-bootstrap/esm/Stack";
import { LoginInput } from "../components/UserLogin/LoginInput";

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
    <Stack>
      <h1>Register</h1>
      {error && <h2>{error.message}</h2>}
      <form onSubmit={handleAccountCreation}>
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
        <input type="submit" value={"Create Account"} />
      </form>
    </Stack>
  );
}
