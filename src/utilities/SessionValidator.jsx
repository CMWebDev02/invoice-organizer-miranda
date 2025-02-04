import { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { UserLoggedInContext } from "./userContext";

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
        if (cookies) {

        }
    }, [cookies])

    return (
        <CookiesProvider>
            <UserLoggedInContext.Provider value={isUserLoggedIn}>
            {children}
            </UserLoggedInContext.Provider>
        </CookiesProvider>
    )
}