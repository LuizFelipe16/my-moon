import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #e52e4d;

    --gray-900: #171923;
    --gray-800: #1A202C;
    --gray-700: #2D3748;
    --gray-600: #4A5568;

    --purple-900: #5429cc;
    --purple-800: #44337A;
    --purple-700: #553C9A;
    --purple-600: #6B46C1;
    --purple-500: #805AD5;
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