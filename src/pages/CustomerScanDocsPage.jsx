import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { CustomerScannedDocumentsChangeLog } from "../utilities/localStorage";

export function CustomerScanDocsPage({endPointURL}) {
    
    return (
        <InvoiceOrganizer pageName={'customer-scanned-documents'} changeLogStorage={CustomerScannedDocumentsChangeLog}
            endPointURL={endPointURL} />
    )
}