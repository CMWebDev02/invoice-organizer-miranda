import { useEffect, useState } from "react";

export function UseFileSort({ fileTransfer }) {
    const [ isTransferring, setIsTransferring ] = useState(false);
    const [ errorOccurred, setErrorOccurred ] = useState(false);
    const [ transferResult, setTransferResult ] = useState({});

    useEffect(() => {
        if (fileTransfer) {
            async function triggerFileTransfer() {
                try { 
                    setIsTransferring(true);
                    
                    const baseURL = 'http://localhost:3000/sortFile'
                    let postURL = `${baseURL}?customerFolderPath=${fileTransfer.customerFolderPath}&customerName=${fileTransfer.customerName}&invoiceName=${fileTransfer.invoiceName}&year=${fileTransfer.year}`
                    
                    let response = await fetch(postURL, {
                        method: 'POST',
                    })
                    
                    if (!response.ok) throw new Error('Failed To Make File Sort Request');
                    let transferResponse = await response.json();
                    
                    setTransferResult(transferResponse);
                } catch (error) {
                    console.error(error);
                    setErrorOccurred(error.message);
                } finally {
                    setIsTransferring(false);
                }
            }
            
            triggerFileTransfer()
        }
    }, [fileTransfer])

    return {isTransferring, errorOccurred, transferResult}
}