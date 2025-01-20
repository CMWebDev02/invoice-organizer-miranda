import Form from 'react-bootstrap/Form'
import styles from '../styles/ChangeLogStyles.module.css'

export function ChangeLogSelector({ updateSelected }) {
    return (
        <Form.Select aria-label='ChangeLogSelector' onChange={(e) => updateSelected(e.target.value)} className={`${styles.changeLogSelector}`}>
            <option value={'customer-scanned-documents'}>Customer Scanned Documents</option>
            <option value={'account-payables'}>Account Payables</option>
        </Form.Select>
    )
}