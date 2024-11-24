import { ChangeInfo } from "../components/ChangeLog/ChangeInfo";

export function ChangeLog({changeLog}) {

    return (
        <div>
            {changeLog && changeLog.map(change => <ChangeInfo info={change} />)}
        </div>
    )
}