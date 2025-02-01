import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie'

import { ChangeLogPage } from './pages/ChangeLogPage';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { CustomerScanDocsPage } from './pages/CustomerScanDocsPage';
import { AccountsPayablesPage } from './pages/AccountPayablesPage';

import { UserLoggedInContext } from './utilities/userContext'

import './styles/GlobalStyles.css'
import { Register } from './pages/Register';
import { Login } from './pages/Login';


const baseQueryClient = new QueryClient();
const endPointURL = 'http://localhost:3000';

export function App() {
    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);

    return (
      <CookiesProvider>
        <UserLoggedInContext.Provider value={isUserLoggedIn}>
          <QueryClientProvider client={baseQueryClient}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login endPointURL={endPointURL} />} />
                <Route path='/register' element={<Register endPointURL={endPointURL} />} />
                <Route path='/customer-scanned-documents' element={<CustomerScanDocsPage endPointURL={endPointURL} />} />
                <Route path='/accounts-payables' element={<AccountsPayablesPage endPointURL={endPointURL} />} />
                <Route path='/changeLog' element={<ChangeLogPage endPointURL={endPointURL} />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </UserLoggedInContext.Provider>
      </CookiesProvider>
    )
}
