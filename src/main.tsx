import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>,
);
