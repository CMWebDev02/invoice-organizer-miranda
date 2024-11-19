export function NewCustomerNameInput({customerNameControls}) {
    const [ newCustomerName, setNewCustomerName ] = customerNameControls;

    return (
        <>
            <label htmlFor='customerFolderInput'>Customer Name (Lastname Firstname):</label>
            <input id='customerFolderInput' type='text' placeholder='Lastname Firstname'
                    value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} />
        </>
    )
}