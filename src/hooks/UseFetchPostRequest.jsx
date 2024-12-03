import { useEffect, useState } from "react";
import { appendQueriesParameters } from "../utilities/stringMutations";

export function UseFetchPostRequest({ fetchURLBase, queries }) {
    const [ fetchResponse, setFetchResponse ] = useState(null);
    const [ errorOccurred, setErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (!queries) return;
        const abortController = new AbortController;
        const abortSignal = abortController.signal;

        async function makePostRequest() {
            try {
                setIsLoading(true);
                setErrorOccurred(false);
                let fetchURL = appendQueriesParameters(fetchURLBase, queries);
                
                let response = await fetch(fetchURL, { method: 'POST', signal: abortSignal});
                if (!response.ok) throw new Error('Fetch request failed.');
                let data = await response.json();
                setFetchResponse(data);
            } catch (error) {
                console.error(error);
                setErrorOccurred(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        makePostRequest();

        // return () => abortController.abort();
    }, [fetchURLBase, queries]);
    
    return {fetchResponse, errorOccurred, isLoading};
}