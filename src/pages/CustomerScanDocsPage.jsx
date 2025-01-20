import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { CustomerScannedDocumentsChangeLog } from "../utilities/localStorage";

/**
 * @component Renders the Customer Scanned Document organizer.
 * @props {string} endPointURL - Defines the URL for the project's backend. 
 * @returns {React.JSX.Element}
 */
export function CustomerScanDocsPage({endPointURL}) {
    
    return (
        <InvoiceOrganizer pageName={'customer-scanned-documents'} changeLogStorage={CustomerScannedDocumentsChangeLog} endPointURL={endPointURL} />
    )
}
