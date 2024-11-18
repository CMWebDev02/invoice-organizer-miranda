import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';

export function TransferToolTip(props) {
    let { lastTransferMessage } = props;

    return (
        <Tooltip id={`transfer-tooltip`} {...props}>
            {lastTransferMessage}
        </Tooltip>
    )
}