import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";
import { DirectoryDisplay } from "../DirectoryDisplay/DirectoryDisplay";
import { InvoiceViewer } from "../DirectoryDisplay/InvoiceViewer";
import { DirectoryFilter } from "../DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../YearSelection/YearSelector";

export function MainContainer(props) {

    return (
        <main>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={10}>
                            <DirectoryFilter filter={[props.directoryFilter, props.alterDirectoryFilter]} isDisabled={props.isUserInteractionDisabled} />
                        </Col>
                    
                        <Col xs={2}>
                            <YearSelector isDisabled={props.isUserInteractionDisabled} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={12}>
                    <DirectoryDisplay directoryFilter={props.directoryFilter} fetchKey={`${props.pageName}-customerFolders`}
                        updateIsLoadingBoolean={props.updateIsLoadingBoolean} sortFile={props.sortFile} endPoint={`${props.endPointURL}/${props.pageName}`} />
                </Col>
            </Row>
            
            {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
            <ChangeLogDisplay endPoint={`${props.endPointURL}/${props.pageName}`} changeLog={props.changeLog.slice(0)} alterChangeLog={props.alterChangeLog} />

            <InvoiceViewer updateIsLoadingBoolean={props.updateIsLoadingBoolean} endPoint={`${props.endPointURL}/${props.pageName}`} fetchKey={`${props.pageName}-invoiceViewer`} />
        </main>
    )
}