import React from "react";
import {Link} from "react-router-dom";
import style from "./style.module.css";



export default function Landing(){
    return(
        <div>
            <span className={style.landing}>
                <h1 className={style.h1} >Bienvendidos! 😊</h1>
                <h3>Hola mi nombre es Enzo 👋🏻, antes de clickear el enlace "Comenzar" déjame contarte un poco de lo que se trata este proyecto.</h3>
                <h4>Desarrolle una SPA(Single Page Application) utilizando React para el Front End y Redux cómo stmanagement. Todos los componentes fueron desarrollados con CSS sin uso de librerías externas. 
                La SPA consume datos de una API a través de un Back End desarrollado en Node.JS utilizando Express, agregando nuevas funcionalidades a la API original.
                Algunos features del proyecto: ordenamientos, filtros, busquedas, añadir a favoritos, formulario controlado para la creación de Pokemons formulario controlado para actualizar Pokemons.
                Ahora si clickea <Link className={style.link} to="/home">Comenzar</Link> y disfruta la app!! 
                </h4>
            </span>
        </div>
    )
}