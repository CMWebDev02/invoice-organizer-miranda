import { useEffect, useState } from "react";

export function UseFetchGetRequest({ fetchURL, makeRequest }) {
    const [ fetchData, setFetchData ] = useState(null);
    const [ errorOccurred, setErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        async function makeGetRequest() {
            try {
                setIsLoading(true);
                let response = await fetch(fetchURL, { method: 'GET', signal: abortSignal});
                if (!response.ok) throw new Error('Fetch request failed.');
                let data = await response.json();
                setFetchData(data);
            } catch (error) {
                console.error(error);
                setErrorOccurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        makeGetRequest();

        // return () => abortController.abort();
    }, [fetchURL, makeRequest]);
    
    return {fetchData, errorOccurred, isLoading};
}