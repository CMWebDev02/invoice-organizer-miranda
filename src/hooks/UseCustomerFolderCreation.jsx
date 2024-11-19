import { useEffect, useState } from "react";

export function UseCustomerFolderCreation({ newCustomerFolderName }) {
    const [ folderCreationResult, setFolderCreationResult ] = useState('');
    const [ errorOccurred, setErrorOccurred ] = useState('');
    const [ isNewFolderInitializing, setIsNewFolderInitializing ] = useState(false)

    useEffect(() => {
        if (newCustomerFolderName) {
            const abortFetchController = new AbortController();
            const abortSignal = abortFetchController.signal;

            async function createNewCustomerFolder() {
                try {
                    setIsNewFolderInitializing(true);
                    const backendServerURL = 'http://localhost:3000/createNewFolder'
                    let fetchUrl = `${backendServerURL}?customerFolderName=${newCustomerFolderName}&letterFolder=${newCustomerFolderName[0]}`;
                    let response = await fetch(fetchUrl, {
                        method: 'POST',
                        signal: abortSignal,
                    })

                    console.log(response)
                } catch (error) {
                    console.error(error);
                    setErrorOccurred(error.message);
                } finally {
                    setIsNewFolderInitializing(false);
                }
            }

            createNewCustomerFolder()
        }

        return () => {
            // abortFetchController.abort();
        }
    }, [newCustomerFolderName])

    return { folderCreationResult, isNewFolderInitializing, errorOccurred}
}