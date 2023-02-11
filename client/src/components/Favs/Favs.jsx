import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFav } from "../../actions";
import style from "./style.module.css";

export default function Favs(){
    const dispatch = useDispatch();
    const myPoke = useSelector((state) => state.favs)

    const handleDelFavs = (e) =>{
        e.preventDefault()
        dispatch(deleteFav(e.target.id))
    }
        
return(
    <div>

     <span className={style.span} >
                <h2 className={style.h2} >My pokemons</h2>
                <Link to={"/home"} className={style.link} ><BsArrowLeft/></Link>
     </span>
     <div className={style.conteiner} >
             
        {
            myPoke.length > 0 && myPoke.map((p) =>
            <div key={p.id + p.name}  >
                <div className= {style.favs} >
                    <div className={style.btnX} >
                        <button onClick={handleDelFavs} id={p.id} className={style.btnDel} >✖️​</button>
                    </div>
                    <h1>{p.name}</h1>
                    <img className={style.img} src={p.img} alt={p.name} />
                </div>
            </div>  
            ) 
        }
     </div>
    
    </div>
        
 )
}