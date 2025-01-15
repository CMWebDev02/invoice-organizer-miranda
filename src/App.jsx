import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ChangeLogPage } from './pages/ChangeLogPage';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { CustomerScanDocsPage } from './pages/CustomerScanDocsPage';
import { AccountsPayablesPage } from './pages/AccountPayablesPage';

import './styles/GlobalStyles.css'

const baseQueryClient = new QueryClient();
const endPointURL = 'http://localhost:3000';

export function App() {
    return (
      <QueryClientProvider client={baseQueryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/customerScannedDocuments' element={<CustomerScanDocsPage endPointURL={endPointURL} />} />
            <Route path='/accountsPayable' element={<AccountsPayablesPage endPointURL={endPointURL} />} />
            <Route path='/changeLog' element={<ChangeLogPage endPointURL={endPointURL} />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    )
}