import { TransferToolTip } from '../../components/TransferIcon/TransferToolTip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-regular-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { useEffect, useRef, useState } from 'react';

export function TransferIcon({ isTransferring, transferResult }) {
    const [ iconColor, setIconColor ] = useState('black');
    const lastTransferResultTarget = useRef(null)

    useEffect(() => {
        if (transferResult.transfer) setIconColor(transferResult.transfer === ' Succeeded' ? 'green' : 'red');
    }, [transferResult])

    return (
        <OverlayTrigger 
            placement='right'
            overlay={<TransferToolTip lastTransferMessage={transferResult.message} />}
            trigger="click"
            target={lastTransferResultTarget}
        >
            <FontAwesomeIcon icon={faFile} ref={lastTransferResultTarget}
                color={iconColor} shake={isTransferring} />
        </OverlayTrigger>
    )
}