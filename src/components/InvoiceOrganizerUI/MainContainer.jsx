import { ChangeLogDisplay } from "../ChangeLog/ChangeLogDisplay";
import { DirectoryDisplay } from "../DirectoryDisplay/DirectoryDisplay";
import { InvoiceViewer } from "../DirectoryDisplay/InvoiceViewer";
import { DirectoryFilter } from "../DirectoryDisplay/UserInteraction/DirectoryFilter";
import { YearSelector } from "../YearSelection/YearSelector";

export function MainContainer(props) {

    return (
        <main>
            <div>
                <DirectoryFilter filter={[props.directoryFilter, props.alterDirectoryFilter]} isDisabled={props.isUserInteractionDisabled} />
                
                <YearSelector isDisabled={props.isUserInteractionDisabled} />
            </div>

            <div>
                <DirectoryDisplay directoryFilter={props.directoryFilter} fetchKey={`${props.pageName}-customerFolders`}
                    updateIsLoadingBoolean={props.updateIsLoadingBoolean} sortFile={props.sortFile} endPoint={`${props.endPointURL}/${props.pageName}`} />
                
                {/* Add the user setting to control how many changeLog actions are displayed in the quick view*/}
                <ChangeLogDisplay endPoint={`${props.endPointURL}/${props.pageName}`} changeLog={props.changeLog.slice(0)} alterChangeLog={props.alterChangeLog} />
            </div>

            <InvoiceViewer updateIsLoadingBoolean={props.updateIsLoadingBoolean} endPoint={`${props.endPointURL}/${props.pageName}`} fetchKey={`${props.pageName}-invoiceViewer`} />
        </main>
    )
}