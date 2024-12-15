import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'

import { InvoiceOrganizer } from "./pages/InvoiceOrganizer";
import { ChangeLogPage } from './pages/ChangeLogPage';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { AccountsPayablePage } from './pages/AccountsPayablePage';

const baseQueryClient = new QueryClient();

export function App() {

  return (
    <QueryClientProvider client={baseQueryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/invoiceOrganizer' element={<InvoiceOrganizer />} />
          <Route path='/accountsPayable' element={<AccountsPayablePage />} />
          <Route path='/changeLog' element={<ChangeLogPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}