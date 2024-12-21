import { InvoiceOrganizer } from "../containers/InvoiceOrganizer";
import { CustomerScannedDocumentsChangeLog } from "../utilities/localStorage";

export function CustomerScanDocsPage() {
    
    return (
        <InvoiceOrganizer pageName={'Customer Scanned Documents'} changeLogStorage={CustomerScannedDocumentsChangeLog}
            fileSortEndPoint={'http://localhost:3000/sortFile'} folderCreationEndPoint={'http://localhost:3000/createNewFolder'}/>
    )
}