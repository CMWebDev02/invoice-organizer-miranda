import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from 'react-bootstrap/ThemeProvider'

import {App} from './App.jsx'
import './styles/CustomStyles.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider
      breakpoints={['mobilePortrait', 'mobileLandscape', 'tabletPortrait', 'tabletLandscape', 'desktopView']}
      minBreakpoint='mobilePortrait'
    >
      <App />
    </ThemeProvider>
  </StrictMode>,
)
