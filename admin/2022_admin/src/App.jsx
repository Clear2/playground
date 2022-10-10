import { useState } from 'react'

import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl'
import RenderRouter  from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import './App.css'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
        <IntlProvider locale='zh'>
            <BrowserRouter>
                <RenderRouter />
            </BrowserRouter>
        </IntlProvider>
    </ConfigProvider>
  )
}

export default App
