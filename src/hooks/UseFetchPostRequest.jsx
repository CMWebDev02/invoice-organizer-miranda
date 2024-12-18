import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { appendQueriesParameters } from "../utilities/stringMutations";

export function UseFetchPostRequest({ fetchURLBase, alterChangeLog, associateFetchKey }) {
    const mainQueryClient = useQueryClient()
    const { mutateAsync: triggerFetchPostRequest, error, isLoading } = useMutation({
        mutationFn: makePostRequest,
        onSuccess: handleSuccessfulTransfer
    })

    async function makePostRequest(queries) {
        let fetchURL = appendQueriesParameters(fetchURLBase, queries);
        let response = await axios.post(fetchURL);
        return response.data;
    }

    function handleSuccessfulTransfer(transferData) {
        //* A check is made to determine if this post request alters data fetched from the server.
        //? If so, the associated query key is invalidated
        //? to trigger said queries to refetch for the updated information
        if (associateFetchKey != '') mainQueryClient.invalidateQueries(associateFetchKey);

        //? Then the response data from the post request is added to the changelog.
        alterChangeLog(prevChanges => [transferData, ...prevChanges])
    }

    return {triggerFetchPostRequest, errorOccurred: error?.message, isLoading};
}