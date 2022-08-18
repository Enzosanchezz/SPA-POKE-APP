import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import style from "./style.module.css";

export default function Search(){
    const dispatch = useDispatch()
    const [name , setName] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getNamePokemons(name))
        setName("")  
    }
    const handleInput = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    }
    return(
        <div className={style.searchBar} >
            <input value={name} className={style.input} type="text" onChange={(e) => handleInput(e)} placeholder="Busca tu pokemon" />
            <button className={style.button} type="submit"  onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}