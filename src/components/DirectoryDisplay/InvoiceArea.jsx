import { UserInputs } from "./UserInputs"
import { DirectoryDisplay } from "./DirectoryDisplay"
import { InvoiceViewer } from "./InvoiceViewer"
import { NewDirectoryModal } from "./NewDirectoryModal";
import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";

import { useState } from "react";

export function InvoiceArea(props) {
    const [isUserInteractionDisabled, setIsUserInteractionDisabled] = props.userInteraction
    const [ nameFilter, setNameFilter ] = useState('');

    return (
        <main>
            <UserInputs filter={[nameFilter, setNameFilter]} year={props.year} isInteractionDisabled={isUserInteractionDisabled} />

            
            <div>
                <DirectoryDisplay 
                    setIsUserInteractionDisabled={setIsUserInteractionDisabled} sortFile={props.sortFile} 
                        nameFilter={nameFilter} setCustomer={props.setCustomer} />

                <ChangeLogDisplay changeLog={props.changeLog} alterChangeLog={props.alterChangeLog} />
            </div>

            <InvoiceViewer setCurrentInvoice={props.currentInvoice} transferOccurred={props.transferOccurred} />

            <NewDirectoryModal showModal={props.showNewFolderModal} toggleNewFolderModal={props.toggleNewFolderModal} newCustomerFolderName={props.newCustomerFolderName} />
        </main>
    )
}