import { useEffect, useState } from "react";
import { UseFetchGetRequest } from "../../hooks/UseFetchGetRequest";
import { DirectoryList } from "./DirectoryList";
import { useSearchParams } from "react-router";
import Stack from "react-bootstrap/esm/Stack";
import styles from './styles/DirectoryDisplayStyles.module.css'

export function DirectoryDisplay({ endPoint, directoryFilter, updateIsLoadingBoolean, sortFile, fetchKey, showQuickTransferButtons }) {
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
        updateIsLoadingBoolean({name: 'directoriesLoading', value: isLoading})
    }, [isLoading])

    function setSelectedDirectory(e) {
        let targetID;

        if (e?.target === undefined) {
            targetID = e;
        } else {
            e.stopPropagation()
            
            if (e.target.tagName === 'SPAN') {
                targetID = e.target.parentElement.parentElement.id
            } else if (e.target.tagName === 'P') {
                targetID = e.target.parentElement.id
            } else {
                targetID = e.target.id
            }
        }

        setQueryParameters(prevParameters => {
            prevParameters.set('selectedDirectory', targetID)
            return prevParameters
        });
    }

    const RenderDirectoryList = () => {
        return errorOccurred ?
            <h2>{errorOccurred}</h2> :
            <DirectoryList showQuickTransferButtons={showQuickTransferButtons} selectDirectory={setSelectedDirectory} 
                selectedDirectory={queryParameters.get('selectedDirectory')} directoryFilter={directoryFilter} directories={allDirectories} sortFile={sortFile} />
    }

    return (
        <Stack className={`${styles.directoryDisplay} p-1 h-75 overflow-auto w-100 d-flex flex-row flex-wrap align-items-start align-content-start`}>
            {isLoading && <h2>Gathering Customer Folders</h2>}
            <RenderDirectoryList />
        </Stack>
    )
}