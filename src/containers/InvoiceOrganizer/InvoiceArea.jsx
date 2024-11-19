import { UserInputs } from "./UserInputs"
import { FolderDisplay } from "./FolderDisplay"
import { ChangeLog } from "../ChangeLog"
import { InvoiceViewer } from "./InvoiceViewer"
import { NewFolderModal } from "./NewFolderModal";

import { useState } from "react";

export function InvoiceArea(props) {
    const [ nameFilter, setNameFilter ] = useState('');

    return (
        <main>
            <UserInputs filter={[nameFilter, setNameFilter]} year={props.year} isInteractionDisabled={props.isUserInteractionDisabled} />

            
            <div>
                <FolderDisplay 
                    toggleUserInteraction={props.toggleUserInteraction} sortFile={props.sortFile} 
                        nameFilter={nameFilter} setCustomer={props.setCustomer} />

                <ChangeLog />
            </div>

            <InvoiceViewer setCurrentInvoice={props.currentInvoice} transferOccurred={props.transferOccurred} />

            <NewFolderModal showModal={props.showNewFolderModal} toggleNewFolderModal={props.toggleNewFolderModal} newCustomerFolderName={props.newCustomerFolderName} />
        </main>
    )
}