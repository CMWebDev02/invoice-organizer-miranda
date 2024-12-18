import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'


export function NewDirectoryModal({ showModal, toggleNewFolderModal, triggerFolderCreation}) {    
    const [errorMessage, setErrorMessage] = useState('');
    const customerNameRef = useRef(null);

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
        let newCustomerName = customerNameRef.current.value;
        
        let nameArr = newCustomerName.trim().split(' ');
        let customerFolderQuery = nameArr.join('%20').toUpperCase();
        triggerFolderCreation({customerFolderName: customerFolderQuery, letterFolder: customerFolderQuery[0]});
        toggleNewFolderModal();

    }

    return (
        <Modal show={showModal} >
            <Modal.Header>
                <Modal.Title>Create New Customer Folder (Lastname Firstname)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <h3>{errorMessage}</h3>}
                <label htmlFor='customerFolderInput'>Customer Name (Lastname Firstname):</label>
                <input id='customerFolderInput' type='text' placeholder='Lastname Firstname' ref={customerNameRef} />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={toggleNewFolderModal} >Close</button>
                <button onClick={checkName}>Create Folder</button>
            </Modal.Footer>
        </Modal>
    )
}