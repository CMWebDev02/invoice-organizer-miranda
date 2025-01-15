import { useQuery } from "react-query";
import axios from 'axios'

export function UseFetchGetRequest({ fetchURL, key}) {
    const { data: fetchData, isLoading, error, status } = useQuery({
        queryKey: [key],
        queryFn: makeGetRequest
    })

    async function makeGetRequest() {
        let response = await axios.get(fetchURL, {
            method: 'get',
        })
        return response.data
    }
    
    return {fetchData, errorOccurred: error?.message, isLoading};
}