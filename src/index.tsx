import './custom.scss';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap/dist/css/bootstrap.min.css"; // Importando CSS do Bootstrap
import "./index.css"; // Certifique-se de que este arquivo está correto
import App from "./App";
import {CartProvider} from "./core/cotexto/ICardContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <CartProvider>
          <App />
      </CartProvider>
  </BrowserRouter>
);