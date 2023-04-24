import { keyframes } from "styled-components";

export const opacidadeAnim = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`
export const opacidadeErrorAnim = keyframes`
  0%{
    display: block;
    opacity: 0;
    transform: translateX(-1000px);
  }
  5%{
    opacity: 1;
    transform: translateX(20px);
  }
  10%{
    opacity: 1;
    transform: translateX(-20px);
  }
  15%{
    opacity: 1;
    transform: translateX(0px);
  }
  80%{
    opacity: 1;
    transform: translateX(0px);
  }
`

export const move = keyframes`
 0% { margin : 0px 0px; opacity:0}
 50% { margin : 5px 0px; opacity:1}
 100% { margin: 0px; opacity: 1; }
`


export const rotate = keyframes`
  0% { transform: rotateY(90deg );}
  100% { transform: rotateY(0deg);}
`