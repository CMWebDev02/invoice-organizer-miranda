import { useEffect, useState } from "react"
import { useSearchParams } from "react-router";

export function DirectoryList({ customers, sortFile }) {
    const [queryParameters, setQueryParameters] = useSearchParams();
    const [ filteredNames, setFilteredNames ] = useState([]);
    const [ selectedName, setSelectedName ] = useState(null);

    useEffect(() => {
        if (queryParameters.get('nameFilter')) {
            //* All strings will be capitalized before being compared to allow for instances in which the user chooses to store folders based on their preferred writing convention,
            //* either all uppercase, lowercase, or a mixture of the two.
            let capitalizedFilter = queryParameters.get('nameFilter').toUpperCase();
            //? The customer array contains arrays that are separated alphabetically, using character codes allows for easy access of the appropriate array.
            let characterIndex = capitalizedFilter.charCodeAt(0) - 65;
            //! A check needs to be made in case the server does not have a folder associated with the letter to avoid errors.
            if (customers.length > characterIndex) {
                setFilteredNames(customers[characterIndex].filter(name => {
                    if (name.toUpperCase().startsWith(capitalizedFilter)) return true
                }))
            } else {
                setFilteredNames([]);
            }
        } else {
            setFilteredNames([]);
        }

        
        setSelectedName(null)
        setQueryParameters(prevParameters => {
            prevParameters.set('selectedCustomer', '')
            return prevParameters
        });
    }, [queryParameters, customers, setSelectedName, setQueryParameters])

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