import { UserInputs } from "./UserInputs"
import { FolderDisplay } from "./FolderDisplay"
import { ChangeLog } from "../ChangeLog"
import { InvoiceViewer } from "./InvoiceViewer"
import { NewFolderModal } from "./NewFolderModal";

import { useState } from "react";

export function InvoiceArea({ year, userInteraction, sortFile, setCustomer, currentInvoice, transferOccurred, showNewFolderModal, toggleNewFolderModal, newCustomerFolderName }) {
    const [ nameFilter, setNameFilter ] = useState('');

    return (
        <main>
            <UserInputs filter={[nameFilter, setNameFilter]} year={year} isInteractionDisabled={userInteraction} />

            
            <div>
                <FolderDisplay 
                    disableUserInteraction={userInteraction} sortFile={sortFile} 
                        nameFilter={nameFilter} setCustomer={setCustomer} />

                <ChangeLog />
            </div>

            <InvoiceViewer setCurrentInvoice={currentInvoice} transferOccurred={transferOccurred} />

            <NewFolderModal showModal={showNewFolderModal} toggleNewFolderModal={toggleNewFolderModal} newCustomerFolderName={newCustomerFolderName} />
        </main>
    )
}