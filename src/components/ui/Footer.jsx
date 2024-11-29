import { Link } from "react-router";

export function Footer({ children }) {
    return (
        <footer>
            {children}
            <Link to={'/changelog'}>ChangeLog</Link>
        </footer>
    )
}