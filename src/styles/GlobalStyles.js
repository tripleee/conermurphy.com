import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  --blue: rgba(44, 66, 81, 1);
  --black: #2e2e2e;
  --white: rgba(251, 255, 254, 1);

   html {
       font-size: 10px;
   } 

   body {
       font-size: 2rem;
   }

   /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--blue) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--blue) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }
  
`;

export default GlobalStyles;
