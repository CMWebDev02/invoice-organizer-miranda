import { useEffect, useState } from "react";
import { UseFetchGetRequest } from "../../hooks/UseFetchGetRequest";
import { DirectoryList } from "./DirectoryList";

export function DirectoryDisplay({ nameFilter, alterUserInteraction, sortFile, fetchKey }) {
    const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({fetchURL: 'http://localhost:3000/getDirectories', key: fetchKey})
    const [ customerFolders, setCustomerFolders ] = useState([]);

    useEffect(() => {
        if (fetchData) {
            setCustomerFolders(fetchData.customersArray);
        }
    }, [fetchData])

    useEffect(() => {
        if (isLoading) {
            alterUserInteraction({type: 'SET_ACTIVE'})
        } else {
            alterUserInteraction({type: 'SET_DISABLED'})
        }
    }, [isLoading, alterUserInteraction])

    return (
        <div>
            {isLoading && <h2>Gathering Customer Folders</h2>}
            {errorOccurred ? <h2>{errorOccurred}</h2> : <DirectoryList nameFilter={nameFilter} customers={customerFolders} sortFile={sortFile} />}
        </div>
    )
}