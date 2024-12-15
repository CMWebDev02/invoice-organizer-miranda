import { useQuery } from "react-query";

export function UseFetchGetRequest({ fetchURL, key}) {
    const { data: fetchData, isFetching: isLoading, error: errorOccurred } = useQuery({
        queryKey: [key],
        queryFn: makeGetRequest,
        staleTime: (1000 * 60 * 5) // Refetch every five minutes 

    })

    async function makeGetRequest() {
        try {
            let response = await fetch(fetchURL, { method: 'GET'});
            if (!response.ok) throw new Error('Fetch request failed.');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    
    return {fetchData, errorOccurred, isLoading};
}