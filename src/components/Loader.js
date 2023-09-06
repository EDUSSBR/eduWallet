import { ThreeDots } from "react-loader-spinner";

export function Loader({height,    width,    radius,    wrapperStyle}){
    return <ThreeDots
    height={height}
    display='inline'
    width={width}
    radius={radius}
    color="#FEA43D"
    ariaLabel="three-dots-loading"
    wrapperStyle={wrapperStyle}
    wrapperClassName=""
    visible={true}
  />
}


//PRIMEIRO LOADER HOMEPAGE

// <ThreeDots
//           height="26px"
//           display='inline'
//           width="40"
//           radius="9"
//           color="#FEA43D"
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{ background: "inherit", marginLeft: "28px" }}
//           wrapperClassName=""
//           visible={true}
//         />

// segundo loadder home
// height
// width
// radius
// wrapperStyle
// <ThreeDots
//                   height="28px"
//                   display='inline'
//                   width="25px"
//                   radius="25"
//                   color="#FEA43D"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{ marginLeft: "7px" }}
//                   wrapperClassName=""
//                   visible={true}
//                 />