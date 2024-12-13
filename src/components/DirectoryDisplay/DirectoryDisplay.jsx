import { useEffect, useState } from "react";
import { UseFetchGetRequest } from "../../hooks/UseFetchGetRequest";
import { DirectoryList } from "./DirectoryList";

export function DirectoryDisplay({ nameFilter, setIsUserInteractionDisabled, sortFile }) {
    const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({fetchURL: 'http://localhost:3000/getDirectories', makeRequest: ''})
    const [ customerFolders, setCustomerFolders ] = useState([]);

    useEffect(() => {
        if (!fetchData) {
            setIsUserInteractionDisabled(true);
        } else {
            setCustomerFolders(fetchData.customersArray);
            setIsUserInteractionDisabled(false);
        }
    }, [fetchData, setIsUserInteractionDisabled])

    return (
        <div>
            {isLoading && <h2>Gathering Customer Folders</h2>}
            {errorOccurred ? <h2>{errorOccurred}</h2> : <DirectoryList nameFilter={nameFilter} customers={customerFolders} sortFile={sortFile} />}
        </div>
    )
}