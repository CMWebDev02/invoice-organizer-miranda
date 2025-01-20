import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { UseFetchGetRequest  } from '../../hooks/UseFetchGetRequest';

export function InvoiceViewer({ endPoint, updateIsLoadingBoolean, fetchKey, styles }) {
    const [ queryParameter, setQueryParameters ] = useSearchParams();
    const [ invoicePath, setInvoicePath ] = useState('');

    const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({ fetchURL: `${endPoint}/get-invoice`, key: fetchKey });

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

        if (errorOccurred) {
            setQueryParameters(prevParameters => {
                prevParameters.set('currentInvoice', '');
                return prevParameters;
            })
        } else if (queryParameter.get('currentInvoice') !== fetchData.fileName || invoicePath === '') {
            //? Checks if the current fileName property is different or if the invoicePath is currently blank, if either of these are the case, then the invoice needs to be decoded and displayed to the user
            //? and if these are not the case, the invoice is already being shown and does not need to be decoded.
            setQueryParameters(prevParameters => {
                prevParameters.set('currentInvoice', fetchData.fileName);
                return prevParameters;
            });
            setInvoicePath(decodePDFIntoBlob(fetchData.file));
        }
    }, [fetchData, errorOccurred, queryParameter, setQueryParameters, invoicePath])

    useEffect(() => {
        updateIsLoadingBoolean({name: 'invoiceLoading', value: isLoading})
    }, [isLoading])

    return (
        <div className={`h-100 w-100 ps-mobileLandscape-1 ps-tabletPortrait-0 ps-tabletLandscape-1 pt-1 pt-mobileLandscape-0 pt-tabletPortrait-1 pt-tabletLandscape-0`}>
            {isLoading && <h2 className='h-25'>Retrieving Invoice</h2>}
            {errorOccurred && <h2 className='h-25'>{errorOccurred}</h2>}
            <iframe className={`w-100 ${isLoading || errorOccurred ? 'h-75' : 'h-100'}`} src={errorOccurred || isLoading ? '/invalid-invoice.pdf' : invoicePath} />
        </div>
    )
}