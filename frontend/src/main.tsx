import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import SocketContextProvider from './context/Socket.Context'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>  
  <BrowserRouter>
  <SocketContextProvider>
    <App />
  </SocketContextProvider>
</BrowserRouter>
  </ChakraProvider>
)
