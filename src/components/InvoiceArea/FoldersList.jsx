import { useEffect, useState } from "react"

export function FolderList({ customers, nameFilter, setCustomer }) {
    const [ filteredNames, setFilteredNames ] = useState([]);

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
    }, [nameFilter, customers])

    function signalSelectedCustomer(e, name) {
        // Temp to show selected user
        e.target.style.color = 'red'

        setCustomer(name)
    }

    return (
        <div>
            {filteredNames == 0 ? <h2>No Matching Users</h2> : filteredNames.map(name => <div key={`folder-${name}`} onClick={(e) => signalSelectedCustomer(e, name)} className="">{name} <button>Quick Transfer</button></div>)}
        </div>
    )
}