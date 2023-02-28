import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteDetail, filterAttack, filterCreated, filterOrder, filterType, getPokemons, getType } from "../../actions";
import Card from "../Card/Card";
import Favs from "../Favs/Favs";
import Paginado from "../Paginado/Paginado";
import Search from "../Search/Search";
import style from "./style.module.css";
import { AiFillFastForward , AiFillFastBackward } from "react-icons/ai";
import Loader from "../loader/Loader";

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const allType = useSelector((state) => state.types)
    const [order, setOrder] = useState('');
    const [page, setPage] = useState(1)
    const [pokePage, setPokePage] = useState(12);
    const  lastPoke = page * pokePage;
    const firtsPoke = lastPoke - pokePage;
    const currentPoke = allPokemons.slice(firtsPoke, lastPoke);


    const prevPage = (e) => {
        e.preventDefault();
        if(page > 1){
            setPage(page - 1)
        }else{
            Swal.fire("No hay paginas Previas")
    }
    }
    const nextPage = (e) =>{
        e.preventDefault();
        if(Math.ceil(allPokemons.length / 12) > page ){
            setPage(page + 1)
        }else{
            Swal.fire("No hay mas Paginas")
        }
    }
    useEffect(() =>{
        dispatch(deleteDetail())
    },[dispatch])

    useEffect(() =>{
        dispatch(getPokemons())
        dispatch(getType())
    },[dispatch])


    const handleVolver = (e) =>{
        e.preventDefault()
        dispatch(getPokemons())
    }

    const handleCreated = (e) =>{
        dispatch(filterCreated(e.target.value))
    }

    const handleType = (e) =>{
        e.preventDefault()
        dispatch(filterType(e.target.value))
        setPage(1)
    }
    function handleOrder(e){
        e.preventDefault();
        dispatch(filterOrder(e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleAttack(e){
        e.preventDefault();
        dispatch(filterAttack(e.target.value))
        setPage(1)
        setOrder(`ordenado ${e.target.value}`)
    }

    return(
    <div>
        <div className={style.span} >
            {/* <div className={style.divHome} >
            </div> */}
                <button className={style.botonVolverCargar} onClick={(e) => handleVolver(e)} >&nbsp;&nbsp;↻&nbsp;&nbsp;</button>
                <Link to={"/pokemons"} className={style.creaPokemon} >
                <button className={style.boton} >Crear un Pokemon</button>
                </Link>
                <Link to={"/favs"} className={style.creaPokemon} >
                <button className={style.boton} >Favoritos</button>
                </Link>
                
                <Search/>
             </div>
        <div>
                <select className={style.select} onChange={e => {handleOrder(e)}} >
                    <option value= "alphabeticalOrder">Orden Alfabetico</option>
                    <option value= "asc">Ascendente A-Z</option>
                    <option value= "desc">Descendente Z-A</option>
                </select>
                <select className={style.select} onChange={e => {handleAttack(e)}}>
                    <option value= "attack">Ataque</option>
                    <option value= "attackMin">Ataque Min</option>
                    <option value= "attackMax">Ataque Max</option>
                </select>
                <select className={style.select} onChange={(e) => handleType(e)} >
                    <option value="All">Tipos</option>
                    {
                    allType?.map((d, i)=> (
                        <option key={i} value={d.name}>{d.name}</option>
                    ))}
                </select>
                <select className={style.select} onChange={(e) => handleCreated(e)} >
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Api</option>
                </select>
                        <br />
                
                <Paginado 
                pokePage={pokePage}
                allPokemons={allPokemons.length}
                />
        </div>
        <div>
    
            { 
             !currentPoke.length ? <Loader style="margin: 0px 0px 50px 0px" /> :
            currentPoke? 
                     
                currentPoke.map((r , i) => {
                    return(
                        <div className={style.cards} key={i}>
                            <Link to={"/home/" + r.id} className={style.link} >
                            <Card 
                            name = {r.name}
                            types = {r.types+ "  " }
                            img = {r.img}
                            />
                            </Link>
                        </div>
                    )
                }) : null
            } 
        </div>
            <button className={style.btn} onClick={(e) => prevPage(e)} ><AiFillFastBackward/></button>
            <span>{page}</span>
            <button className={style.btn} onClick={(e) => nextPage(e)} ><AiFillFastForward/></button>
    </div>
    )
}