import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import style from "./style.module.css";
import Swal from 'sweetalert2'
import { BsSearch } from "react-icons/bs";

export default function Search(){
    const dispatch = useDispatch()
    const [name , setName] = useState("")

    const handleSubmit = () =>{
        if(name){
          dispatch(getNamePokemons(name))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Escribe un nombre por favor',
              })
        }
        setName("")  
    }
  
    function handleEnter(name) {
        handleSubmit(name);
        setName("");
    }


    return(
        <div className={style.searchBar} >
            <input value={name} 
            className={style.input} 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnter(name)} 
            placeholder="Busca tu pokemon" />
            <button 
            className={style.button} 
            type="submit"  
            onClick={handleSubmit}
            >
            <BsSearch/>
            </button>
        </div>
    )
}