import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function DirectoryFilter({ isDisabled }) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ filterValue, setFilterValue ] = useState(queryParameters.get('nameFilter') || '');


    function checkFilterValue(e) {
        let filterInput = e.target.value.toUpperCase()
        //* Offsets by 65 to make the process of filtering for the 26 capital letters of the alphabet more simplistic.
        if (filterInput.length != 1) {
            setFilterValue(e.target.value)
        } else {
            let firstCharacterCode = filterInput.charCodeAt(0) - 65;
    
            if (firstCharacterCode >= 0 && firstCharacterCode < 26) setFilterValue(e.target.value);
        }
    }

    useEffect(() => {
        // if (!filterValue) return
        let timeOut = setTimeout(() => {
            setQueryParameters(prevParameters => {
                prevParameters.set('nameFilter', filterValue);
                return prevParameters;
            })
        }, 250)

        return () => {
            clearTimeout(timeOut)
        }
    }, [filterValue, setQueryParameters])

    return (
        <div>
            <label htmlFor="customerFilter">Find:</label>
            <input id="customerFilter" type='text' placeholder='Enter Customer Name...' value={filterValue} onChange={checkFilterValue} 
                disabled={isDisabled} />
        </div>
    )
}