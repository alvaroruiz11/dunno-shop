import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DunnoShop } from './DunnoShop';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DunnoShop />
  </StrictMode>
);
