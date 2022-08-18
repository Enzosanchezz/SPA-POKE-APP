import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams} from "react-router-dom";
import { detailPoke, putPokemon } from "../../actions";
import Modified from "../Modified/Modified";
import style from "./style.module.css";

export default function Detail(props){
    
    const dispatch = useDispatch();
    
    useEffect(() => {
       dispatch(detailPoke(props.match.params.id)) 
    }, [dispatch])

    const myPoke = useSelector((state) => state.details)
    // console.log('myPoke :>> ', myPoke);

    

    return(
        <div>
            <span className={style.span} >
                <h2>My pokemons</h2>
                <Link to={"/home"} className={style.link} >🢀 Volver</Link>
            
                <Link to={`/pokemons/${props.match.params.id}`}>Modificar</Link>
                
            </span>
            {
    
                    myPoke.length > 0 ? 
                    <div className={style.div} >
                        <h1>name: {myPoke[0].name}</h1>
                        
                        <div className={style.details} >

                        {myPoke[0].img ? <img className= {style.img} src={myPoke[0].img} alt={myPoke[0].name} /> : 
                        <img className= {style.img} src="https://http2.mlstatic.com/D_NQ_NP_656546-MLB31843488813_082019-O.jpg" alt="pokemon" />} 
                        <ul className={style.li} >
                        <h4>types: {myPoke[0].types.map(t => t + " ")}</h4>
                            <li>hp: {myPoke[0].hp}</li>
                            <li>attack: {myPoke[0].attack}</li>
                            <li>defense: {myPoke[0].defense}</li>
                            <li>speed: {myPoke[0].speed}</li>
                            <li>height: {myPoke[0].height}</li>
                            <li>weight: {myPoke[0].weight}</li>
                        </ul>
                        </div>

                    </div>: <h3>Loading...</h3>
            }
        </div>
    )

}

