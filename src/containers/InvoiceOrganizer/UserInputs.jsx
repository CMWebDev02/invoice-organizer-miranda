import { CustomerFilter } from "../../components/UserInputs/CustomerFilter"
import { YearSelector } from "../../components/UserInputs/YearSelector"

export function UserInputs({filter, year, isInteractionDisabled}) {
    return (
        <div>
            <CustomerFilter filterControls={filter} isDisabled={isInteractionDisabled} />
            
            <YearSelector yearControls={year} isDisabled={isInteractionDisabled} />
        </div>
    )
}