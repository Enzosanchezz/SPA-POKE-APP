import React, { useLayoutEffect } from 'react'
import loading from "../../assets/loading.gif"
import style from "./style.module.css";

function Loader() {
    // useLayoutEffect(() => {
    //     const loader = 
    //         document.getElementById("loader");
    //         loader.classList.add("loaded");
    
    //         setTimeout(() => {
    //           document.body.removeChild(loader);
    //         }, [15000]);
    //   }, []);
  return (
   <div>
    <img className={style.img} src={loading} alt="cargando" />
   </div>
  )
}

export default Loader