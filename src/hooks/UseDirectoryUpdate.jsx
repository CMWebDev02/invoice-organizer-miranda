import { useEffect, useState } from "react";

export function UseDirectoryUpdate({ toggleUserInteraction }) {
    const [ customerFolders, setCustomerFolders ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorOccurred, setErrorOccurred ] = useState(false);

    useEffect(() => {
        const abortFetchCall = new AbortController;
        const abortSignal = abortFetchCall.signal;
        
        async function fetchDirectories() {
            try {
                let response = await fetch('http://localhost:3000/getDirectories', {signal: abortSignal});
                if (!response.ok) throw new Error('Failed to fetch customer folders.');
                let data = await response.json();
                setCustomerFolders(data.customersArray);
                toggleUserInteraction(false)
            } catch (error) {
                console.error(error);
                setErrorOccurred(error.message);
            } finally {
                setIsLoading(false)
            }
        }


        fetchDirectories();
        return () => {
            // abortFetchCall.abort();
        }
    }, [toggleUserInteraction])

    return {customerFolders, isLoading, errorOccurred}
}