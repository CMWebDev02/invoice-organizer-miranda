import { useEffect, useState } from 'react';
import { UseFetchGetRequest } from '../../hooks/UseFetchGetRequest';

export function InvoiceViewer({setCurrentInvoice, transferOccurred}) {
    const { isLoading: isInvoiceLoading, errorOccurred: invoiceError, fetchData } = UseFetchGetRequest({ fetchURL: 'http://localhost:3000/getInvoice', makeRequest: transferOccurred });
    const [ invoicePath, setInvoicePath ] = useState('');

    useEffect(() => {
        /**
         * @function Decodes a Base64 string that represents a file's binary data into an array buffer containing the bytes needed to reconstruct the file.
         * This is necessary since sending raw binary can lead to file corruption, so instead a string of characters representing the binary is used since all devices
         * can properly handle reading text characters.
         * Afterwards it creates a blob out of the array buffer.
         * @param {string} fileString - Base64 string that will be decoded.
         * @returns returns a object url that points to the path of the decoded file.
         */
        function decodePDFIntoBlob(fileString) {
            //? The atob method decodes the base64 string back to raw binary.
            const fileBinary = atob(fileString);
            //* A new array is constructed to create an array buffer.
            const arrayBuffer = new Uint8Array(fileBinary.length);
            
            //? The binary is iterated through and the associated index in the array buffer converts the binary value to an equivalent Unicode value.
            for (const index in fileBinary) {
                arrayBuffer[index] = fileBinary.charCodeAt(index);
            } 

            //? Constructs a blob out of the array buffer created from the buffer array.
            let pdfBlob = new Blob([arrayBuffer], {type: 'application/pdf'});
            
            //? Returns a objectUrl that points towards the pdfBlob.
            return URL.createObjectURL(pdfBlob);
        }

        if (!fetchData) return;

        if (fetchData.fileName != '') {
            setCurrentInvoice(fetchData.fileName);
            setInvoicePath(decodePDFIntoBlob(fetchData.file))
        };
    }, [fetchData, setCurrentInvoice])

    useEffect(() => {
        if (invoiceError) setCurrentInvoice('')
    }, [invoiceError, setCurrentInvoice])

    return (
        <div>
            {isInvoiceLoading && <h2>Retrieving Invoice</h2>}
            {invoiceError ? <h2>{invoiceError}</h2> : <iframe src={invoicePath} />}
        </div>
    )
}