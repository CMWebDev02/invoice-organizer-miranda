export function FilterOptions({alterDisplayedChanges, currentFilter}) {
    const filterOptionsArray = [ 'File Transfer', 'Folder Creation', 'Undo Action' ];
    
    let tempStyle = {
        backgroundColor: 'red'
    }

    return (
        <div>
            {filterOptionsArray.map(option => <button key={option} style={currentFilter == option ? tempStyle : {}} onClick={alterDisplayedChanges} name={option}>{option}</button>)}            
        </div>
    )
}