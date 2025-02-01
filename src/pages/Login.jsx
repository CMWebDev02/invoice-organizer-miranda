import { useRef } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { LoginInput } from "../components/UserLogin/LoginInput";

/**
 * @component Renders the login page and handles the logic for storing the user session information received from the backend.
 * @returns {React.JSX.Element}
 */
export function Login() {
    const userNameRef = useRef(null);
    const userKeyRef = useRef(null);

    function handleLogIn(e) {
        e.preventDefault();

        
    }

    return (
        <Stack>
            <h1>Login</h1>
            <form>
                <LoginInput type={'text'} inputRef={userNameRef} labelName={`Username`} />
                <LoginInput type={'password'} inputRef={userKeyRef} labelName={`Password`} />
                <input type="submit" value={'Sign In'}/>
            </form>
        </Stack>
    )
}
