import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #e52e4d;

    --gray-900: #171923;
    --gray-800: #1A202C;
    --gray-700: #2D3748;
    --gray-600: #4A5568;
    --gray-200: #B3B5C6;
    --gray-100: #D1D2DC;

    --purple-900: #5429cc;
    --purple-800: #44337A;
    --purple-700: #553C9A;
    --purple-600: #6B46C1;
    --purple-500: #805AD5;
    --purple-400: #9F7AEA;
    --purple-300: #B794F4;
    
    --toastify-icon-color-info: var(--gray-900);
    --toastify-text-color-info: var(--gray-900);
    --toastify-text-color-dark: var(--gray-900);
    --toastify-color-progress-info: var(--gray-900);
    
    --toastify-color-dark: var(--purple-600);
    --toastify-color-info: var(--purple-600);
    --toastify-toast-background: var(--purple-600);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1000px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    overflow-x: hidden;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: var(--gray-900);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--purple-700);
  }
`;