import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";
import { addFav, DeletePokemon, detailPoke} from "../../actions";
import Modified from "../Modified/Modified";
import style from "./style.module.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Loader from "../loader/Loader";
import pokebola from "../../assets/pokebola.png"

export default function Detail(props){
    
    const dispatch = useDispatch();
    
    useEffect(() => {
       dispatch(detailPoke(props.match.params.id)) 
    }, [dispatch])

    const myPoke = useSelector((state) => state.details)
    const pokeFav = useSelector((state) => state.favs)

    const handleFavs = () =>{
        dispatch(addFav(myPoke))
        Swal.fire(`${myPoke[0].name} fue agregado a favoritos `)
    }
    const handleDelete = () =>{
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
                  `${myPoke[0].name} ha sido eliminado con éxito.`,
                  'success',
                  dispatch(DeletePokemon(props.match.params.id)),
                  )
                }
            })
        }
   
    return(
        <div>
            <span className={style.span} >
                <Link to={"/home"} className={style.linkReturn} ><IoReturnDownBackOutline/></Link>
                <div className={style.divF} >

                <Link to={"/favs"} className={style.link} >
                    <button className={style.boton} >Favoritos</button>
                </Link>
                </div>
            </span>
            {
                    myPoke.length > 0 ? 
                    <div className={style.details}>
                        
                        <div  >
                        {myPoke[0].createdInDb == true ?
                        <div className={style.delete} >
                            <button className={style.btnDelete} onClick={handleDelete}  ><MdOutlineDeleteForever/></button>
                        </div> : null
                        }
                        <div className={style.btnEditStar} >
                         {myPoke[0].createdInDb == true ?
                        <Link to={`/pokemons/${props.match.params.id}`} className={style.linkEdit} ><AiFillEdit/></Link> :
                        null}
                        
                        {
                            pokeFav.length > 0 && pokeFav.find((p) => p.id == (myPoke[0].id)) ? null :
                            <button onClick={handleFavs} className={style.star} >⭐</button>
                        }
                         </div>
                        <h1>{myPoke[0].name}</h1>
                        {myPoke[0].img ? <img className= {style.img} src={myPoke[0].img} alt={myPoke[0].name} /> : 
                        <img className= {style.imgD} src={pokebola} alt="pokemon" />} 
                        <ul className={style.li} >
                        <h4>{myPoke[0].types.map(t => t + " ")}</h4>
                            <li>hp: {myPoke[0].hp}</li>
                            <li>attack: {myPoke[0].attack}</li>
                            <li>defense: {myPoke[0].defense}</li>
                            <li>speed: {myPoke[0].speed}</li>
                            <li>height: {myPoke[0].height}</li>
                            <li>weight: {myPoke[0].weight}</li>     
                        </ul>
                        </div>
                    </div>: <Loader/>
            }
        </div>
    )

}

