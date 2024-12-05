import { BrowserRouter, Route, Routes } from 'react-router'

import { InvoiceOrganizer } from "./pages/InvoiceOrganizer";
import { ChangeLogPage } from './pages/ChangeLogPage';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { AccountsPayablePage } from './pages/AccountsPayablePage';

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/invoiceOrganizer' element={<InvoiceOrganizer />} />
        <Route path='/accountsPayable' element={<AccountsPayablePage />} />
        <Route path='/changeLog' element={<ChangeLogPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}