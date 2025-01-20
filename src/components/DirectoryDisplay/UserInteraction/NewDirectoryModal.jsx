import { useEffect, useRef, useState } from 'react'
import { UseHotKey } from '../../../hooks/UseHotKey.jsx'
import Modal from 'react-bootstrap/Modal'
import styles from '../styles/DirectoryDisplayStyles.module.css'
import Stack from 'react-bootstrap/esm/Stack.js';

export function NewDirectoryModal({ showModal, toggleNewFolderModal, createFolderInfo}) {    
    const [errorMessage, setErrorMessage] = useState('');
    const directoryNameRef = useRef(null);

    UseHotKey({triggerKey: "U", action: toggleNewFolderModal, variablesCheck: [!showModal], dependencies: [showModal]});
    UseHotKey({triggerKey: "Enter", action: checkName, variablesCheck: [!showModal], dependencies: [directoryNameRef, showModal]});

    function focusDirectoryNameInput() {
        console.log('focus')
        directoryNameRef.current.select();
    }

    useEffect(() => {
        let clearErrorMessage;
        if (errorMessage !== '') {
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
        
        if (NewDirectoryName !== '')  {
            createFolderInfo(NewDirectoryName.toUpperCase())
            toggleNewFolderModal();
        } else {
            setErrorMessage('Please Enter A Valid Directory Name!')
        }

    }

    return (
        <Modal show={showModal} onEntering={focusDirectoryNameInput}>
            <Modal.Header className={`${styles.newDirectoryModalHeader}`}>
                <Modal.Title>Create New Directory</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${styles.newDirectoryModalBody}`}>
                {errorMessage && <h3>{errorMessage}</h3>}
                <Stack className={`${styles.userInputContainer}`} direction='horizontal' gap={2}>
                    <label htmlFor='customerFolderInput' className={`${styles.modalLabel}`}>Directory Name:</label>
                    <input className={`${styles.modalInput} ${styles.userInput}`} id='customerFolderInput' type='text' placeholder='Lastname Firstname' ref={directoryNameRef} />
                </Stack>
            </Modal.Body>
            <Modal.Footer className={`${styles.newDirectoryModalFooter} d-flex justify-content-between`}>
                <button className='interfaceButton' onClick={toggleNewFolderModal} >Close</button>
                <button className='interfaceButton' onClick={checkName}>Create Folder</button>
            </Modal.Footer>
        </Modal>
    )
}