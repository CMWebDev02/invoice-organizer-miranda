import { CustomerFilter } from "../../components/UserInputs/CustomerFilter"
import { YearSelector } from "../../components/UserInputs/YearSelector"

export function UserInputs({filter}) {
    return (
        <div>
            <CustomerFilter filterControls={filter} />
            
            <YearSelector />
        </div>
    )
}