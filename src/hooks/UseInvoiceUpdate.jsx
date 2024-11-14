import { useState, useEffect } from 'react';

export function UseInvoiceUpdate() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorOcurred, setErrorOcurred ] = useState(false);
    const [ invoicePDF, setInvoicePDF ] = useState('');

    useEffect(() => {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        async function fetchInvoice() {
            try {
                let response = await fetch('http://localhost:3000/getInvoice', {signal: abortSignal});
                if (!response.ok) throw new Error('Failed to fetch invoice.');
                //? The invoice is retrieved as a blob and is temporarily stored by the browser.
                let data = await response.blob();
                
                console.log(response.headers.get('x-invoice-organizer-file-path'))
                
                // //? The createObjectURL method is used to provide a link to the pdf file's temporary location, and with this location when set to link to an elements src to display the pdf.
                let url = URL.createObjectURL(data)
                setInvoicePDF(url)
            } catch (error) {
                console.error(error);
                setErrorOcurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchInvoice()

        return () => {
            // abortController.abort();
        }
    }, [])

    return { isLoading, errorOcurred, invoicePDF }
}