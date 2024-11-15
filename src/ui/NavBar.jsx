import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-regular-svg-icons'

export function NavBar({ sortFile }) {
    return (
        <nav>
        <h1>Invoice Organizer</h1>
        <FontAwesomeIcon icon={faFile} />

        <button onClick={sortFile}>Sort</button>
        <button>Menu</button>
      </nav>
    )
}