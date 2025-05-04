import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colores para tema claro */
    --golden: #d4af37;
    --deep-navy: #0A1B2A;
    --warm-white: #f5f5f5;
    --accent-blue: #3498db;
    
    /* Variables para tema claro */
    --background-primary: #f5f5f5;
    --background-secondary: #ffffff;
    --text-primary: #1a2a3a;
    --text-secondary: #4a5568;
    --accent-color: #d4af37;
    --shadow: rgba(0, 0, 0, 0.1);
  }
  
  [data-theme="dark"] {
    /* Variables para tema oscuro */
    --background-primary: #0A1B2A;
    --background-secondary: #0F2336;
    --text-primary: #f5f5f5;
    --text-secondary: #a0aec0;
    --accent-color: #d4af37;
    --shadow: rgba(0, 0, 0, 0.3);
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: var(--background-primary);
    color: var(--text-primary);
    font-family: 'Trajan Pro', serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: var(--golden);
  }
`;

export default GlobalStyles;