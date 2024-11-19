import Tooltip from 'react-bootstrap/Tooltip';

export function ChangeLogToolTip(props) {
    let { lastchangemessage } = props;

    return (
        <Tooltip id={`transfer-tooltip`} {...props}>
            {lastchangemessage}
        </Tooltip>
    )
}