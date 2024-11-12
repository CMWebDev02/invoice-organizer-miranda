export function CustomerFilter({filterControls}) {
    const [ filterValue, setFilterValue ] = filterControls;

    return (
        <div>
            <label htmlFor="customerFilter">Find:</label>
            <input id="customerFilter" type='text' placeholder='Enter Customer Name...' value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
        </div>
    )
}