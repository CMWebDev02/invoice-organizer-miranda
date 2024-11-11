export function FilterInputs() {
    return (
        <div>
            <div>
                <label>Find:</label>
                <input type='text' placeholder='Enter Customer Name...' />
            </div>
            <div>
                <label>Year:</label>
                <input type='number' min={2010}/>
            </div>
        </div>
    )
}