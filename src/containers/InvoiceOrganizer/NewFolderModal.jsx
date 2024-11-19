import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { NewCustomerNameInput } from '../../components/NewFolderModal/NewCustomerNameInput';

export function NewFolderModal({ showModal, toggleNewFolderModal, newCustomerFolderName}) {
    const [ newCustomerName, setNewCustomerName ] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setNewCustomerName('');
        setErrorMessage('');
    }, [showModal])

    function checkName() {
        setErrorMessage('')

        let nameArr = newCustomerName.split(' ');
        if (nameArr.length != 2) {
            setErrorMessage('Error: Please Enter a Valid Name!')
        } else {
            let customerFolderQuery = nameArr.join('%20');
            newCustomerFolderName(customerFolderQuery);
            toggleNewFolderModal();
        };

    }

    return (
        <Modal show={showModal} >
            <Modal.Header>
                <Modal.Title>Create New Customer Folder (Lastname Firstname)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <h3>{errorMessage}</h3>}
                <NewCustomerNameInput customerNameControls={[ newCustomerName, setNewCustomerName ] } />

            </Modal.Body>
            <Modal.Footer>
                <button onClick={toggleNewFolderModal} >Close</button>
                <button onClick={checkName}>Create Folder</button>
            </Modal.Footer>
        </Modal>
    )
}