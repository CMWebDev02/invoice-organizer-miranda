import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-regular-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useEffect, useRef, useState } from 'react';

export function ChangeLogIcon({ isChanging, changeResult, className }) {
    const [ iconColor, setIconColor ] = useState('black');
    const lastChangeResultTarget = useRef(null)

    useEffect(() => {
        console.log(changeResult)
        if (changeResult?.result) setIconColor(changeResult?.result === 'Succeeded' ? 'green' : 'red');
    }, [changeResult])

    const showChangeLogToolTip = (props) => (
        <Tooltip id={`transfer-tooltip`} {...props}>
            {changeResult?.message}
        </Tooltip>
    )

    return (
        <OverlayTrigger 
            placement='bottom'
            overlay={showChangeLogToolTip}
            trigger="click"
        >
            <FontAwesomeIcon icon={faFile} ref={lastChangeResultTarget}
                color={iconColor} shake={isChanging} className={className}/>
        </OverlayTrigger>
    )
}