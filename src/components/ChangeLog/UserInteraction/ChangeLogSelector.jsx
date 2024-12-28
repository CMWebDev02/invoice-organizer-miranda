export function ChangeLogSelector({ updateSelected }) {
    return (
        <select onChange={(e) => updateSelected(e.target.value)}>
            <option value={'customer-scanned-documents'}>Customer Scanned Documents</option>
            <option value={'account-payables'}>Account Payables</option>
        </select>
    )
}