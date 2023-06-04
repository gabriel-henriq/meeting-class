import React from 'react'
import ReactDOM from 'react-dom/client'
import  MyApp from './pages/App.tsx'
import './styles/index.css'
import {App, ConfigProvider} from "antd";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ConfigProvider>
          <App>
              <MyApp />
          </App>
      </ConfigProvider>
  </React.StrictMode>,
)
