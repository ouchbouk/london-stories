import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* overflow-y: scroll; */
  
  font-size: 63.5%;

  @media (max-width: 1200px){
  font-size: 55%;
} 

@media (max-width:900px){
  font-size:45%;

} 

  @media (max-width:600px){
  font-size:45%;

 } 

@media (min-width:1800px){
  font-size: 75%;

} 
}
body {
  font-size: 18px;
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  line-height: 1;
  font-weight: 400;
  color: #555;
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  user-select: none;
  background-color: #f7f7f7;


 /* @media (max-width:900px){
  font-size:45%;

}  */


}
`;

export default GlobalStyles;
