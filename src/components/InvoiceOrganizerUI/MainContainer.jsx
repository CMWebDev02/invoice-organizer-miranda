import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";
import { DirectoryDisplay } from "../DirectoryDisplay/DirectoryDisplay";
import { InvoiceViewer } from "../DirectoryDisplay/InvoiceViewer";
import { DirectoryFilter } from "../DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../YearSelection/YearSelector";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";

import styles from './styles/MainContainerStyles.module.css'

export function MainContainer(props) {

    return (
        <Row className={`${styles.mainContainer}`}>
            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={4} className={`p-0 h-25 h-mobileLandscape-100 h-tabletPortrait-25 h-tabletLandscape-100`}>
                <Container>
                    <Row>
                        <Col mobilePortrait={12} tabletPortrait={9} tabletLandscape={12} className="p-0 order-1 order-tabletPortrait-2 order-tabletLandscape-1">
                            <Stack gap={2}>
                                <Stack direction="horizontal" gap={1}>
                                    <DirectoryFilter styles={styles} filter={[props.directoryFilter, props.alterDirectoryFilter]} isDisabled={props.isUserInteractionDisabled} />
                                    <YearSelector styles={styles} isDisabled={props.isUserInteractionDisabled} />
                                </Stack>

                                <DirectoryDisplay directoryFilter={props.directoryFilter} fetchKey={`${props.pageName}-customerFolders`} className={styles.directoryDisplay}
                                    updateIsLoadingBoolean={props.updateIsLoadingBoolean} sortFile={props.sortFile} endPoint={`${props.endPointURL}/${props.pageName}`} />
                            </Stack>
                        </Col>
                    
                        {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
                        <Col className={`d-none d-tabletPortrait-flex order-2 order-tabletPortrait-1 order-tabletLandscape-2 p-0`} mobilePortrait={12} tabletPortrait={3} tabletLandscape={12}>
                            <Stack className={`${styles.changeLogDisplay}`}>
                                <ChangeLogDisplay endPoint={`${props.endPointURL}/${props.pageName}`} changeLog={props.changeLog.slice(0)} alterChangeLog={props.alterChangeLog} />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Col>

            <Col mobilePortrait={12} mobileLandscape={6} tabletPortrait={12} tabletLandscape={8} className={`p-0 h-75 h-mobileLandscape-100 h-tabletPortrait-75 h-tabletLandscape-100`}>
                <InvoiceViewer updateIsLoadingBoolean={props.updateIsLoadingBoolean} endPoint={`${props.endPointURL}/${props.pageName}`} fetchKey={`${props.pageName}-invoiceViewer`} />
            </Col>
        </Row>
    )
}