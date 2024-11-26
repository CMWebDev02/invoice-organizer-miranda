export function FilterOptions({updateFilter, currentFilter}) {
    let tempStyle = {
        backgroundColor: 'red'
    }

    return (
        <div>
            <button style={currentFilter == 'File Transfer' ? tempStyle : ''} onClick={() => updateFilter('File Transfer')}>File Transfers</button>
            <button style={currentFilter == 'Folder Creation' ? tempStyle : ''} onClick={() => updateFilter('Folder Creation')}>Folder Creations</button>
            <button style={currentFilter == 'File Transfer' ? tempStyle : ''} onClick={() => updateFilter('Undo Action')}>Undone Actions</button>
        </div>
    )
}