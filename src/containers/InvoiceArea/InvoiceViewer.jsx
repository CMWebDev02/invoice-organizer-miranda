import { useEffect } from 'react';
import { UseInvoiceUpdate } from '../../hooks/UseInvoiceUpdate'

export function InvoiceViewer({setCurrentInvoice, transferOccurred}) {
    const { isLoading: isInvoiceLoading, errorOcurred: invoiceError, invoicePDF, invoiceFileName } = UseInvoiceUpdate({ transferOccurred });

    useEffect(() => {
        if (invoiceFileName != '') {
            setCurrentInvoice(invoiceFileName)
        }
    }, [invoiceFileName, setCurrentInvoice])

    return (
        <div>
            {isInvoiceLoading && <h2>Retrieving Invoice</h2>}
            {invoiceError ? <h2>{invoiceError}</h2> : <iframe src={invoicePDF} />}
        </div>
    )
}