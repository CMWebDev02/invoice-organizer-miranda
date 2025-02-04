import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";

/**
 * @component Wraps the main application and provides the project access to cookies, the UserLoggedInContext, and 
 * validates the user session stored in cookies.
 * @param {ReactNode} children - Node elements wrapped within the component.
 * @returns {React.JSX.Element}
 */
export function SessionValidator({children}) {
    const [ cookies, setCookies ] = useCookies("account");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!cookies?.account && location.pathname !== "/login" && location.pathname !== "/register") navigate('/login')
    }, [cookies, navigate, location])

    return (
        <>
            {children}
        </>
    )
}