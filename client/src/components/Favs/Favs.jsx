import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteFav } from "../../actions";
import style from "./style.module.css";

export default function Favs(){
    const dispatch = useDispatch();
    const myPoke = useSelector((state) => state.favs)

    const handleDelFavs = (e) =>{
        e.preventDefault()
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se revertirá!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si! eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                  'Eliminado!',
                  'Su Pokemon ha sido eliminado de favoritos.',
                  'success',
                  dispatch(deleteFav(e.target.id))
              )
            }
          })
        
    }
        
return(
    <div>

     <span className={style.span} >
                <h2 className={style.h2} >Pokemons favoritos</h2>
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