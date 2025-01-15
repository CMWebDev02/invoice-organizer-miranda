import Toast from 'react-bootstrap/Toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles/ErrorPopUpStyles.module.css'

export function ErrorToast({ isErrorToastDisplayed, error }) {
    return (
        <Toast show={isErrorToastDisplayed} animation={true} className='position-absolute bottom-0 end-0'>
            <Toast.Header className={`${styles.header}`} closeButton={false}>
                <p>
                    <strong>ERROR - </strong>
                    {error?.name}
                </p>
                <FontAwesomeIcon icon={faExclamationCircle} className='ms-auto'/>
            </Toast.Header>
            <Toast.Body className={`${styles.bodyContainer}`}>
            {error?.message}
            </Toast.Body>
        </Toast>
    )
}