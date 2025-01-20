import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { AccountsPayablesChangeLog } from "../utilities/localStorage";

export function AccountsPayablesPage({ endPointURL }) {
    return (
        <InvoiceOrganizer pageName={'accounts-payables'} endPointURL={endPointURL} changeLogStorage={AccountsPayablesChangeLog} />
    )
}