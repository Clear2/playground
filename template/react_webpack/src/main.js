console.log('---->>>')
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './styles/index.scss'

const container = document.getElementById('root')
console.log(container)
const root = createRoot(container)
root.render(<App />)