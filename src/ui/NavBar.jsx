import { TransferIcon } from "../containers/NavBar/TransferIcon"

export function NavBar({ sortFile, isInteractionDisabled, isTransferring, transferResult }) {
    return (
        <nav>
        <h1>Invoice Organizer</h1>
        <TransferIcon isTransferring={isTransferring} transferResult={transferResult} />

        <button onClick={sortFile} disabled={isInteractionDisabled}>Sort</button>
        <button>Menu</button>
      </nav>
    )
}