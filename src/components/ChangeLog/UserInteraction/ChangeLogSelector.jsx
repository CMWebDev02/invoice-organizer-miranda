import Form from 'react-bootstrap/Form'

export function ChangeLogSelector({ updateSelected }) {
    return (
        <Form.Select aria-label='ChangeLogSelector' onChange={(e) => updateSelected(e.target.value)}>
            <option value={'customer-scanned-documents'}>Customer Scanned Documents</option>
            <option value={'account-payables'}>Account Payables</option>
        </Form.Select>
    )
}