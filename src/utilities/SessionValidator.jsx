import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

/**
 * @component Wraps the main application and provides the project access to cookies, the UserLoggedInContext, and 
 * validates the user session stored in cookies.
 * @param {ReactNode} children - Node elements wrapped within the component.
 * @returns {React.JSX.Element}
 */
export function SessionValidator({children}) {
    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);
    const [ cookies, setCookies ] = useCookies("account");

    useEffect(() => {
        setIsUserLoggedIn(cookies?.account ? true : false);
    }, [cookies, setIsUserLoggedIn])

    return (
        <>
            {children}
        </>
    )
}