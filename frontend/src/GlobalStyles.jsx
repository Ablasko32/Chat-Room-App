import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root{
    --primary-color:#4a90e2;
    --secondary-color:#357ABD;
    --subtle-background:#2b3a67;
    --soft-border:#5f738a;
    --background-color:#2e2d2c;
    --bg-lifted:#373635;
    --red-error:#E57373;
    --light-green:#a6d49f;
  }
  
  
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  body{
    color:#EDEDED;
    background-color: var(--background-color);
    
  }


  @media (min-width: 768px) {
    html{
      font-size: 72.5%;
    }
    
  }
`;
