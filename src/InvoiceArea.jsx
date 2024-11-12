import { UserInputs } from "./containers/InvoiceArea/UserInputs"
import { DirectoryList } from "./containers/InvoiceArea/DirectoryList"
import { ChangeLog } from "./containers/ChangeLog"
import { InvoiceViewer } from "./containers/InvoiceArea/InvoiceViewer"

import Button from 'react-bootstrap/Button';

export function InvoiceArea() {

    return (
      <main>
        <Button variant="danger">Click Me</Button>

        <UserInputs />
        
        <div>
          <DirectoryList />

          <ChangeLog />
        </div>

        <InvoiceViewer />
      </main>
    )
}