import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store/store.jsx';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>

    </Provider>
  </StrictMode>,
)
