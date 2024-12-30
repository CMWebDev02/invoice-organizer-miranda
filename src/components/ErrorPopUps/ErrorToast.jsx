import Toast from 'react-bootstrap/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export function ErrorToast({ isErrorToastDisplayed, error }) {
    return (
        <Toast show={isErrorToastDisplayed} animation={true} >
            <Toast.Header closeButton={false} >
                <p>
                    <strong>ERROR - </strong>
                    {error?.name}
                </p>
                <FontAwesomeIcon icon={faExclamationCircle} />
            </Toast.Header>
            <Toast.Body>
            {error?.message}
            </Toast.Body>
        </Toast>
    )
}