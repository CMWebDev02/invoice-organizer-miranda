import { useEffect, useState } from "react";
import { UseDirectoryUpdate } from "../../hooks/UseDirectoryUpdate"
import { FolderList } from "../../components/InvoiceArea/FoldersList";

export function FolderDisplay({ nameFilter }) {
    const {isLoading: isCustomerFoldersLoading, customerFolders, errorOcurred: customerFoldersError} = UseDirectoryUpdate();

    return (
        <div>
            {isCustomerFoldersLoading && <h2>Gathering Customer Folders</h2>}
            {customerFoldersError ? <h2>{customerFoldersError}</h2> : <FolderList customers={customerFolders} nameFilter={nameFilter} />}
            {/* <div>
                <h2>Various customer Names</h2>
                <button>Quick Transfer</button>
            </div>
            <div>
                <h2>Various customer Names</h2>
                <button>Quick Transfer</button>
            </div>
            <div>
                <h2>Various customer Names</h2>
                <button>Quick Transfer</button>
            </div> */}
        </div>
    )
}