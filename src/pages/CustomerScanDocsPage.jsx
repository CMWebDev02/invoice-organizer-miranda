import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { CustomerScannedDocumentsChangeLog } from "../utilities/localStorage";

export function CustomerScanDocsPage() {
    
    return (
        <InvoiceOrganizer pageName={'customer-scanned-documents'} changeLogStorage={CustomerScannedDocumentsChangeLog}
            endPointURL={'http://localhost:3000'} />
    )
}