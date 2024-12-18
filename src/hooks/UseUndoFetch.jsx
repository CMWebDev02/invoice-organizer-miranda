import axios from "axios";
import { useMutation } from "react-query";
import { appendQueriesParameters } from "../utilities/stringMutations";

export function UseUndoFetch({ fetchURLBase, alterChangeLog, associateFetchKey }) {
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
        //? The response data from the post request is added to the changelog and
        //? if the transfer was successfully undone, the original action is removed from the changelog.
        alterChangeLog(prevChanges => {
            let changes = [ transferData, ...prevChanges ];
            if (transferData.result == "Succeeded") {
                changes = changes.filter(change => change.id != transferData.undoneActionId);
            }

            return changes;
        })
    }

    return {triggerFetchPostRequest, errorOccurred: error?.message, isLoading};
}