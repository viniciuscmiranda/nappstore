import { createGlobalStyle } from "styled-components";

import "react-circular-progressbar/dist/styles.css";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  a{
    color: black;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: #ddd;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
  }
`;
