import { CustomerFilter } from "../../components/UserInputs/CustomerFilter"
import { YearSelector } from "../../components/UserInputs/YearSelector"

export function UserInputs() {
    return (
        <div>
            <CustomerFilter />
            
            <YearSelector />
        </div>
    )
}