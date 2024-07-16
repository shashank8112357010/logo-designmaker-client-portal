import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            {/* Add ToastContainer here */}

            <Toaster 
              toastOptions={{
                style: {
                  background: 'black',
                  color: 'white',
                },
              }}
            />

          </PersistGate>
        </Provider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
