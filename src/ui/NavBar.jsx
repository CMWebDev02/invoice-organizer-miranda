import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-regular-svg-icons'

export function NavBar({ sortFile, isInteractionDisabled }) {
    return (
        <nav>
        <h1>Invoice Organizer</h1>
        <FontAwesomeIcon icon={faFile} />

        <button onClick={sortFile} disabled={isInteractionDisabled}>Sort</button>
        <button>Menu</button>
      </nav>
    )
}