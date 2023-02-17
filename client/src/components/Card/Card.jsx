import React from "react";
import style from "./style.module.css";
import pokebola from "../../assets/pokebola.png"

export default function Card({name, img, types}){
    return(
        <div className={style.conteiner} >
            <div className= {style.card}>
                <h2 className= {style.name}>{name}</h2>
                <h4 className={style.types} >{types}</h4>
                {img? <img className={style.img} src={img} alt={"imagen de: "+name} /> : <img className={style.imgP} src={pokebola} alt="pokemon" />}
            </div>
        </div>
    )
}