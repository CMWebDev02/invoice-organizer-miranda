import { useEffect, useState } from "react";

export function UseInvoiceRetriever({ fetchURLBase, makeRequest, invoiceQuery }) {
    const [ invoiceData, setInvoiceData ] = useState(null);
    const [ errorOccurred, setErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        function checkPreviousFetch() {
            console.log(invoiceQuery, invoiceData?.fileName)
            if (invoiceQuery == null || invoiceData?.fileName) return true;
            
            console.log(invoiceQuery == invoiceData?.fileName)
            return invoiceQuery == invoiceData?.fileName ? false : true
        }

        async function fetchInvoice() {
            try {
                setIsLoading(true);
                let fetchURL = fetchURLBase;
                if (invoiceQuery) {
                    fetchURL += `?q=${invoiceQuery}`;
                }
                let response = await fetch(fetchURL, { method: 'GET', signal: abortSignal});
                if (!response.ok) throw new Error('Fetch request failed.');
                let data = await response.json();
                setInvoiceData(data);
                setErrorOccurred(false);
            } catch (error) {
                console.error(error);
                setErrorOccurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (checkPreviousFetch()) { 
            fetchInvoice();
        };

        // return () => abortController.abort();
    }, [fetchURLBase, invoiceQuery, makeRequest])

    return {invoiceData, errorOccurred, isLoading};
}