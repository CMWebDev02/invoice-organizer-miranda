import { DirectoryFilter } from "./DirectoryFilter"
import { YearSelector } from "./YearSelector"

export function UserInputs({filter, year, isInteractionDisabled}) {
    return (
        <div>
            <DirectoryFilter filterControls={filter} isDisabled={isInteractionDisabled} />
            
            <YearSelector isDisabled={isInteractionDisabled} />
        </div>
    )
}