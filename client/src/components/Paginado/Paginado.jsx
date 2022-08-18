import React from "react";

export default function Paginado({pagePoke, allPokemons}){
    let numeroPagina = [];

    for (let i = 1; i <= Math.ceil( allPokemons/pagePoke); i++) {
        numeroPagina.push(i)
    }
    return(
        <br/>
    )
}