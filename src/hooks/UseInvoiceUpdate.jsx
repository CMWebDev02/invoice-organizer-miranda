import { useState, useEffect } from 'react';

export function UseInvoiceUpdate({ transferOccurred }) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorOcurred, setErrorOcurred ] = useState(false);
    const [ invoicePDF, setInvoicePDF ] = useState('');
    const [ invoiceFileName, setInvoiceFileName ] = useState('');

    useEffect(() => {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        /**
         * @function Decodes a Base64 string that represents a file's binary data into an array buffer containing the bytes needed to reconstruct the file.
         * This is necessary since sending raw binary can lead to file corruption, so instead a string of characters representing the binary is used since all devices
         * can properly handle reading text characters.
         * @param {string} fileString - Base64 string that will be decoded.
         */
        function decodePDF(fileString) {
            //? The atob method decodes the base64 string back to raw binary.
            const fileBinary = atob(fileString);
            //* A new array is constructed to create an array buffer.
            const arrayBuffer = new Uint8Array(fileBinary.length);
            
            //? The binary is iterated through and the associated index in the array buffer converts the binary value to an equivalent Unicode value.
            for (const index in fileBinary) {
                arrayBuffer[index] = fileBinary.charCodeAt(index);
            } 
            
            return arrayBuffer
        }

        async function fetchInvoice() {
            try {
                let response = await fetch('http://localhost:3000/getInvoice', {signal: abortSignal});
                if (!response.ok) throw new Error('Failed to fetch invoice.');
                //? The invoice is retrieved as a blob and is temporarily stored by the browser.
                let data = await response.json();

                // A new blob is created using the decoded Base64 string and the resulting array buffer is passed into the blob constructor to recreate the pdf file.
                let pdfBlob = new Blob([decodePDF(data.file)], {type: 'application/pdf'});

                // //? The createObjectURL method is used to provide a link to the pdf file's temporary location, and with this location when set to link to an elements src to display the pdf.
                let url = URL.createObjectURL(pdfBlob)
                setInvoicePDF(url)
                setInvoiceFileName(data.fileName)
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
    }, [transferOccurred])

    return { isLoading, errorOcurred, invoicePDF, invoiceFileName }
}