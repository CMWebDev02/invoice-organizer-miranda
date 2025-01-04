import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";
import { DirectoryDisplay } from "../DirectoryDisplay/DirectoryDisplay";
import { InvoiceViewer } from "../DirectoryDisplay/InvoiceViewer";
import { DirectoryFilter } from "../DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../YearSelection/YearSelector";
import Container from "react-bootstrap/esm/Container";

export function MainContainer(props) {

    return (
        <Row>
            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={4}>
                <Container>
                    <Row>
                        <Col mobilePortrait={12} tabletPortrait={9} tabletLandscape={12} className="order-1 order-tabletPortrait-2 order-tabletLandscape-1">
                            <Row>
                                <Col mobilePortrait={10}>
                                    <DirectoryFilter filter={[props.directoryFilter, props.alterDirectoryFilter]} isDisabled={props.isUserInteractionDisabled} />
                                </Col>
                    
                                <Col mobilePortrait={2}>
                                    <YearSelector isDisabled={props.isUserInteractionDisabled} />
                                </Col>

                                <Col mobilePortrait={12}>
                                    <DirectoryDisplay directoryFilter={props.directoryFilter} fetchKey={`${props.pageName}-customerFolders`}
                                        updateIsLoadingBoolean={props.updateIsLoadingBoolean} sortFile={props.sortFile} endPoint={`${props.endPointURL}/${props.pageName}`} />
                                </Col>
                            </Row>
                        </Col>
                    
                        {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
                        <Col className="d-none d-tabletPortrait-flex order-2 order-tabletPortrait-1 order-tabletLandscape-2" mobilePortrait={12} tabletPortrait={3} tabletLandscape={12}>
                            <ChangeLogDisplay endPoint={`${props.endPointURL}/${props.pageName}`} changeLog={props.changeLog.slice(0)} alterChangeLog={props.alterChangeLog} />
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={8}>
                <InvoiceViewer updateIsLoadingBoolean={props.updateIsLoadingBoolean} endPoint={`${props.endPointURL}/${props.pageName}`} fetchKey={`${props.pageName}-invoiceViewer`} />
            </Col>
        </Row>
    )
}