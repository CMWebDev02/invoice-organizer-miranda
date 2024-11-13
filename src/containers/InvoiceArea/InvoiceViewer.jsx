import { UseInvoiceUpdate } from '../../hooks/UseInvoiceUpdate'

export function InvoiceViewer() {
    const { isLoading: isInvoiceLoading, errorOcurred: invoiceError, invoicePDF } = UseInvoiceUpdate();

    return (
        <div>
            {isInvoiceLoading && <h2>Retrieving Invoice</h2>}
            {invoiceError ? <h2>{invoiceError}</h2> : <iframe src={invoicePDF} />}
        </div>
    )
}