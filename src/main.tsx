import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { store } from './store'
import { queryClient } from './api/campaigns'

// Enable MSW browser worker in development
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
