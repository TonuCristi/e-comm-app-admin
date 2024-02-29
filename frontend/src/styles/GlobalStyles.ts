import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        /* Indigo */
        --color-indigo-50: #eef2ff; 
        --color-indigo-100: #e0e7ff; 
        --color-indigo-200: #c7d2fe; 
        --color-indigo-300: #a5b4fc; 
        --color-indigo-400: #818cf8; 
        --color-indigo-500: #6366f1; 
        --color-indigo-700: #6d28d9; 
        --color-indigo-900: #312e81; 
        --color-indigo-950: #1e1b4b; 
        
        /* Red */
        --color-red-500: #ef4444; 

        /* Emerald */
        --color-emerald-500: rgb(5 150 105);
    }

    *, 
    *::before, 
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    } 

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Poppins", sans-serif;
        line-height: 1;
        font-weight: 400;
        font-size: 1.6rem;
        color: var(--color-indigo-100);
        background-color: var(--color-indigo-950);
    }
`;

export default GlobalStyles;
