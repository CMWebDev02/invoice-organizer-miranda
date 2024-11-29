import { useEffect, useState } from "react"

export function DirectoryList({ customers, nameFilter, setCustomer, sortFile }) {
    const [ filteredNames, setFilteredNames ] = useState([]);
    const [ selectedName, setSelectedName ] = useState(null);

    useEffect(() => {
        if (nameFilter != '') {
            //* All strings will be capitalized before being compared to allow for instances in which the user chooses to store folders based on their preferred writing convention,
            //* either all uppercase, lowercase, or a mixture of the two.
            let capitalizedFilter = nameFilter.toUpperCase();
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
        setCustomer('');
    }, [nameFilter, customers, setCustomer, setSelectedName])

    function signalSelectedCustomer(e, name) {
        setSelectedName(name);

        setCustomer(name);
    }
    
    function quickSort(e, name) {
        e.stopPropagation()
        
        sortFile(name);
    }

    return (
        <div>
            {filteredNames == 0 ? <h2>No Matching Users</h2> : 
            filteredNames.map(name => <div key={`folder-${name}`} onClick={(e) => signalSelectedCustomer(e, name)} style={{color: selectedName == name ? 'red' : 'black'}}>{name} <button onClick={(e) => quickSort(e, name)}>Quick Transfer</button></div>)}
        </div>
    )
}