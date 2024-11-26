import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { InvoiceOrganizer } from "./pages/InvoiceOrganizer";
import { ChangeLogPage } from './pages/ChangeLogPage';

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InvoiceOrganizer />} ></Route>
        <Route path='/changelog' element={<ChangeLogPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}