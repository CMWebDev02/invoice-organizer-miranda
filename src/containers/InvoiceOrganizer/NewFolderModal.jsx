import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { NewCustomerNameInput } from '../../components/NewFolderModal/NewCustomerNameInput';

export function NewFolderModal({ showModal, toggleNewFolderModal, newCustomerFolderName}) {
    const [ newCustomerName, setNewCustomerName ] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        setNewCustomerName('');
        setErrorMessage('');

        //! This currently clears the newCustomerFolderName input once the modal closes but this might cause an error 
            //* As of now it does not seem to but I should still find a better way to do this.
        newCustomerFolderName(null);
    }, [showModal, newCustomerFolderName])

    function checkName() {
        setErrorMessage('')

        let nameArr = newCustomerName.trim().split(' ');
        if (nameArr.length != 2) {
            setErrorMessage('Error: Please Enter a Valid Name!')
        } else {
            let customerFolderQuery = nameArr.join('%20').toUpperCase();
            newCustomerFolderName({customerFolderName: customerFolderQuery, letterFolder: customerFolderQuery[0]});
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