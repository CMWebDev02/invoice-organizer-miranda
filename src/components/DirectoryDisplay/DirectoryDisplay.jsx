import { useEffect, useState } from "react";
import { UseFetchGetRequest } from "../../hooks/UseFetchGetRequest";
import { DirectoryList } from "./DirectoryList";
import { useSearchParams } from "react-router";

export function DirectoryDisplay({ endPoint, directoryFilter, alterUserInteraction, sortFile, fetchKey }) {
    const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({fetchURL: `${endPoint}/get-directories`, key: fetchKey})
    const [ allDirectories, setAllDirectories ] = useState([]);
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    useEffect(() => {
        if (queryParameters.get('selectedDirectory') == null) {
            setQueryParameters(prevParameters => {
                prevParameters.set('selectedDirectory', '')
                return prevParameters
            })
        }
    }, [queryParameters, setQueryParameters])

    useEffect(() => {
        if (fetchData) {
            setAllDirectories(fetchData.directoriesArray);
        }
    }, [fetchData])

    useEffect(() => {
        if (isLoading) {
            alterUserInteraction({type: 'SET_DISABLED'})
        } else {
            alterUserInteraction({type: 'SET_ENABLED'})
        }
    }, [isLoading, alterUserInteraction])

    function setSelectedDirectory(e) {
        e.stopPropagation()
        setQueryParameters(prevParameters => {
            prevParameters.set('selectedDirectory', e.target.id)
            return prevParameters
        });
    }

    return (
        <div>
            {isLoading && <h2>Gathering Customer Folders</h2>}
            {errorOccurred ? <h2>{errorOccurred}</h2> : <DirectoryList selectDirectory={setSelectedDirectory} selectedDirectory={queryParameters.get('selectedDirectory')} directoryFilter={directoryFilter} directories={allDirectories} sortFile={sortFile} />}
        </div>
    )
}