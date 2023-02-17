import React, { useEffect } from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteFav } from "../../actions";
import style from "./style.module.css";
import pikachu from "../../assets/pikachu-enojado.gif"
import pokebola from "../../assets/pokebola.png"

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
    // console.log('myPoke', myPoke)
        
return(
    <div>

     <span className={style.span} >
                <Link to={"/home"} className={style.link} ><IoReturnDownBackOutline/></Link>
                <h2 className={style.h2} >Pokemons favoritos</h2>
     </span>
     <div className={style.conteiner} >
        
        {
            myPoke.length ?  
            myPoke.map((p) =>
            <div key={p.id + p.name}  >
                <div className= {style.favs} >
                    <div className={style.btnX} >
                        <button onClick={handleDelFavs} id={p.id} className={style.btnDel} >✖️​</button>
                    </div>
                    <h1>{p.name}</h1>
                    {
                    p.img ? 
                    <img className={style.img} src={p.img} alt={p.name} /> :
                    <img className= {style.imgF} src={pokebola} alt="pokebola" />
                    }
                </div>
            </div>  
            ) : 
            <div id="historieta">
                <img className={style.pika} src={pikachu} alt="pikachu" />
                <div  className={style.spanPikachu} >
                <span>¿Aún no tienes favoritos?</span>
                </div>
            </div>
        }
     </div>
    
    </div>
        
 )
}