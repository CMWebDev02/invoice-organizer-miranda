import { useState } from "react"
import { useSearchParams } from "react-router";

export function DirectoryList({ nameFilter, customers, sortFile }) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ selectedName, setSelectedName ] = useState(null);
    let filteredNames = [];

    if(nameFilter != '') {
        //? The customer array contains arrays that are separated alphabetically, using character codes allows for easy access of the appropriate array.
        const characterIndex = (nameFilter.toUpperCase()).charCodeAt(0) - 65;
        if (customers[characterIndex] && customers[characterIndex].length != 0) {
            filteredNames = customers[characterIndex].filter(name => {
                //* All strings will be capitalized before being compared to allow for instances in which the user chooses to store folders based on their preferred writing convention,
                //* either all uppercase, lowercase, or a mixture of the two.
                if (name.toUpperCase().startsWith(nameFilter.toUpperCase())) return true
            });
        }
    }

    function signalSelectedCustomer(e) {
        e.stopPropagation()
        setSelectedName(e.target.id);

        setQueryParameters(prevParameters => {
            prevParameters.set('selectedCustomer', e.target.id)
            return prevParameters
        });;
    }
    
    function quickSort(e) {
        e.stopPropagation()

        sortFile(e);
    }

    return (
        <div>
            {filteredNames == 0 ? <h2>No Matching Users</h2> : 
            filteredNames.map(name => <div key={`folder-${name}`} id={name} onClick={signalSelectedCustomer} style={{color: selectedName == name ? 'red' : 'black'}}>{name} <button name={name} onClick={quickSort}>Quick Transfer</button></div>)}
        </div>
    )
}