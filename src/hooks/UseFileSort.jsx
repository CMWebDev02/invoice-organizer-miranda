import { useEffect, useState } from "react";

export function UseFileSort({ fileTransfer }) {
    const [ isTransferring, setIsTransferring ] = useState(false);
    const [ errorOcurred, setErrorOcurred ] = useState(false);
    const [ transferResult, setTransferResult ] = useState('');

    useEffect(() => {
        if (fileTransfer) {
            async function triggerFileTransfer() {
                try { 
                    const baseURL = 'http://localhost:3000/sortFile'
                    let postURL = `${baseURL}?customerFolder=${fileTransfer.customerFolder}&letterFolder=${fileTransfer.letterFolder}&filePath=${fileTransfer.invoicePath}&fileName=${fileTransfer.invoiceName}`

                    let response = await fetch(postURL, {
                        method: 'POST',
                    })
                    if (!response.ok) throw new Error('Failed To Make File Sort Request')
                    let transferResponse = await response.json();

                    console.log(transferResponse)
                } catch (error) {
                    console.error(error);
                    setErrorOcurred(error.message);
                }
            }
            
            triggerFileTransfer()
        }
    }, [fileTransfer])

    return {isTransferring, errorOcurred, transferResult}
}