import { UserInputs } from "./UserInputs"
import { FolderDisplay } from "./FolderDisplay"
import { QuickViewChangeLog } from "./QuickViewChangeLog"
import { InvoiceViewer } from "./InvoiceViewer"
import { NewFolderModal } from "./NewFolderModal";

import { useState } from "react";

export function InvoiceArea(props) {
    const [isUserInteractionDisabled, setIsUserInteractionDisabled] = props.userInteraction
    const [ nameFilter, setNameFilter ] = useState('');

    return (
        <main>
            <UserInputs filter={[nameFilter, setNameFilter]} year={props.year} isInteractionDisabled={isUserInteractionDisabled} />

            
            <div>
                <FolderDisplay 
                    setIsUserInteractionDisabled={setIsUserInteractionDisabled} sortFile={props.sortFile} 
                        nameFilter={nameFilter} setCustomer={props.setCustomer} />

                <QuickViewChangeLog changeLog={props.changeLog} alterChangeLog={props.alterChangeLog} />
            </div>

            <InvoiceViewer setCurrentInvoice={props.currentInvoice} transferOccurred={props.transferOccurred} />

            <NewFolderModal showModal={props.showNewFolderModal} toggleNewFolderModal={props.toggleNewFolderModal} newCustomerFolderName={props.newCustomerFolderName} />
        </main>
    )
}