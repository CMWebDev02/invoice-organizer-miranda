import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'


export function NewDirectoryModal({ showModal, toggleNewFolderModal, createFolderInfo}) {    
    const [errorMessage, setErrorMessage] = useState('');
    const directoryNameRef = useRef(null);

    useEffect(() => {
        let clearErrorMessage;
        if (errorMessage != '') {
            clearErrorMessage = setTimeout(() => {
                setErrorMessage('');
            }, 2000)
        }

        return () => {
            clearTimeout(clearErrorMessage)
        }
    }, [errorMessage])

    function checkName() {
        setErrorMessage('')
        let NewDirectoryName = directoryNameRef.current.value;
        
        if (NewDirectoryName != '')  {
            createFolderInfo(NewDirectoryName.toUpperCase())
            toggleNewFolderModal();
        } else {
            setErrorMessage('Please Enter A Valid Directory Name!')
        }

    }

    return (
        <Modal show={showModal} >
            <Modal.Header>
                <Modal.Title>Create New Customer Folder (Lastname Firstname)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <h3>{errorMessage}</h3>}
                <label htmlFor='customerFolderInput'>Customer Name (Lastname Firstname):</label>
                <input id='customerFolderInput' type='text' placeholder='Lastname Firstname' ref={directoryNameRef} />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={toggleNewFolderModal} >Close</button>
                <button onClick={checkName}>Create Folder</button>
            </Modal.Footer>
        </Modal>
    )
}