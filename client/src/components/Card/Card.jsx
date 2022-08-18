// import React from "react";
// import style from "./style.module.css";

// export default function Card({name, img, types}){
//     return(
//         <div className={style.conteiner} >
//             <div className= {style.card}>
//             <h2 className= {style.name}>Nombre: {name}</h2>
//             <h5 className={style.types} >{types}</h5>
//             {img? <img className={style.img} src={img} alt={"imagen de: "+name} /> : <img className={style.img} src="https://http2.mlstatic.com/D_NQ_NP_656546-MLB31843488813_082019-O.jpg" alt="pokemon" />}
//             </div>
//         </div>
//     )
// }

import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

export default function Card({name, img, types}){
  return (
    <MDBCard>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>

       {img? <MDBCardImage src={img} fluid alt='...' /> : <MDBCardImage src="https://http2.mlstatic.com/D_NQ_NP_656546-MLB31843488813_082019-O.jpg" fluid alt='...' /> }
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>
            {name}
        </MDBCardTitle>
        <MDBCardText>
          {types}
        </MDBCardText>
        <MDBBtn href='#'>More</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}