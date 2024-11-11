// Links to temporary invoice to test display.
import pdfInvoice from '../../assets/TempInvoice.pdf'

export function InvoiceViewer() {
    return (
        <div>
            <h1>Invoice Viewer</h1>
            <iframe src={pdfInvoice}/>
        </div>
    )
}