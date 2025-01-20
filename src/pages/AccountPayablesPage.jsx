import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { AccountsPayablesChangeLog } from "../utilities/localStorage";

/**
 * @component Renders the Accounts Payables organizer.
 * @props {string} endPointURL - Defines the URL for the project's backend. 
 * @returns {React.JSX.Element}
 */
export function AccountsPayablesPage({ endPointURL }) {
    return (
        <InvoiceOrganizer pageName={'accounts-payables'} endPointURL={endPointURL} changeLogStorage={AccountsPayablesChangeLog} />
    )
}
