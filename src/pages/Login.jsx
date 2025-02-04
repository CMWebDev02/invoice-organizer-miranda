import { useRef } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { LoginInput } from "../components/UserLogin/LoginInput";
import { UseAccountRequest } from "../hooks/UseAccountRequest";

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
    <Stack>
      <h1>Login</h1>
      {error && <h2>{error.message}</h2>}
      <form onSubmit={handleLogIn}>
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
        <input type="submit" value={"Sign In"} />
      </form>
    </Stack>
  );
}
