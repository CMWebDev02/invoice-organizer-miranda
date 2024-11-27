import { Link } from "react-router";

export function HomePage() {

    return (
        <div>
            <div>
                <Link to={'/changeLog'} >Change Log</Link>
                <Link to={'/settings'} >Settings</Link>
            </div>

            <Link to={'invoiceOrganizer'}>Invoice Organizer</Link>
            <Link to={'accountsPayable'}>Account Payable</Link>
        </div>
    )
}