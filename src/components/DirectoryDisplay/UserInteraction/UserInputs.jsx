import { DirectoryFilter } from "./DirectoryFilter"
import { YearSelector } from "./YearSelector"

export function UserInputs({ isInteractionDisabled }) {
    return (
        <div>
            <DirectoryFilter isDisabled={isInteractionDisabled} />
            
            <YearSelector isDisabled={isInteractionDisabled} />
        </div>
    )
}