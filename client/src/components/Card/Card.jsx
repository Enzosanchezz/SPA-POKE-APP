import React from "react";
import style from "./style.module.css";

export default function Card({name, img, types}){
    return(
        <div className={style.conteiner} >
            <div className= {style.card}>
            <h2 className= {style.name}>{name}</h2>
            <h4 className={style.types} >{types}</h4>
            {img? <img className={style.img} src={img} alt={"imagen de: "+name} /> : <img className={style.img} src="https://http2.mlstatic.com/D_NQ_NP_656546-MLB31843488813_082019-O.jpg" alt="pokemon" />}
            </div>
        </div>
    )
}