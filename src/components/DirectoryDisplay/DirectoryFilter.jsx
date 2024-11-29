export function DirectoryFilter({filterControls, isDisabled}) {
    const [ filterValue, setFilterValue ] = filterControls;

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

    return (
        <div>
            <label htmlFor="customerFilter">Find:</label>
            <input id="customerFilter" type='text' placeholder='Enter Customer Name...' value={filterValue} onChange={checkFilterValue} 
                disabled={isDisabled} />
        </div>
    )
}