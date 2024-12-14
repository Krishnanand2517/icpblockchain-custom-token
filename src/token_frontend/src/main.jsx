import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthClient } from '@dfinity/auth-client';
import App from './components/App';

const init = async () => {
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handleAuthenticated();
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated();
      }
    });
  }
};

const handleAuthenticated = async (authClient) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

init();
