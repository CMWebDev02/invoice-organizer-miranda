import { ChangeLogToolTip } from '../../components/TransferIcon/ChangeLogToolTip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-regular-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { useEffect, useRef, useState } from 'react';

export function ChangeLogIcon({ isChanging, changeResult }) {
    const [ iconColor, setIconColor ] = useState('black');
    const lastChangeResultTarget = useRef(null)

    useEffect(() => {
        if (changeResult?.result) setIconColor(changeResult?.result === ' Succeeded' ? 'green' : 'red');
    }, [changeResult])

    return (
        <OverlayTrigger 
            placement='right'
            overlay={<ChangeLogToolTip lastchangemessage={changeResult?.message} />}
            trigger="click"
            target={lastChangeResultTarget}
        >
            <FontAwesomeIcon icon={faFile} ref={lastChangeResultTarget}
                color={iconColor} shake={isChanging} />
        </OverlayTrigger>
    )
}