import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { getType, postPokemon } from "../../actions";
import style from "./style.module.css";

export default function Created(){
    const dispatch = useDispatch();
    const history = useHistory();
    const tipos = useSelector((state) => state.types);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"",
        img: "",
        hp: "",
        attack : "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    })
    function handleDelete(i){
        setInput({
            ...input,
            types : input.types.filter((e) => e !== i)
        })
    }

    function validate(input){
        let errors = {};
        if(!input.name){
            errors.name = "Se necesita un nombre"
        }else if( input.hp < 0 || input.hp > 100){
            errors.hp = "Min valor 0 - Max valor 100 "
        }else if (input.attack < 0 || input.attack > 100){
            errors.attack = "Min valor 0 - Max valor 100"
        }else if (input.defense < 0 || input.defense > 100){
            errors.defense = "Min valor 0 - Max valor 100"
        }else if (input.speed < 0 || input.speed >100 ){
            errors.speed = "Min valor 0 - Max valor 100"
        }else if (input.height < 0 || input.height > 100){
            errors.height = "Min valor 0 - Max valor 100"
        }else if (input.weight < 0 || input.weight > 100){
            errors.weight = "Min valor 0 - Max valor 100"
        }

        return errors;
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        if(!input.types.includes(e.target.value))
        setInput({
            ...input, types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length){
            Swal.fire("Completa los campos obligatorios para poder Crear un Pokemon")
        }else{
            Swal.fire({
                title: 'Crear el pokemon?',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Si!'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(postPokemon(input))
                    setInput({
                        name:"",
                        img: "",
                        hp: "",
                        attack : "",
                        defense: "",
                        speed: "",
                        height: "",
                        weight: "",
                        types: [],
                    })
                  Swal.fire(
                    'Creado!',
                    'Su pokemon fue creado.',
                    'success',
                    history.push('/home')
                  )
                }
              })
         
        } 
    }
    useEffect(()=>{
        dispatch(getType())
    },[])
    useEffect(() => {
        setErrors(
          validate({
            ...input,
          })
        );
      }, [input, dispatch]);
    


    return(
        <div>
            <span className={style.divHome} >
            <h1>Crea tu Pokemon</h1>
            <Link to={"/home"} className={style.link} >🢀 Volver</Link>
            </span>

            <form onSubmit={e => handleSubmit(e)} >
                <div className={style.divInput} >
            
               
                    <label>Nombre*:</label>
                    <input className={style.input} type="text" value={input.name} name="name" onChange={e =>  handleChange(e)}/>
                    {errors.name &&(<p>{errors.name}</p>)}
               
                
                    <label>Imagen: </label>
                    <input className={style.input} type="text" value={input.img} name="img" onChange={e =>  handleChange(e)}/>
               
                    <label>Vida:</label>
                    <input className={style.input} type="number"  value={input.hp} name="hp" onChange={e =>  handleChange(e) }/>
                    {errors.hp && <p>{errors.hp}</p>}
                
                    <label>Ataque: </label>
                    <input className={style.input} type="number"  value={input.attack} name="attack" onChange={e =>  handleChange(e)}/>
                    {errors.attack && <p>{errors.attack}</p>}
              
                    <label>Defensa:</label>
                    <input className={style.input} type="number"  value={input.defense} name="defense" onChange={e =>  handleChange(e)}/>
                    {errors.defense && <p>{errors.defense}</p> }
               
                    <label>Velocidad:</label>
                    <input className={style.input} type="number"  value={input.speed} name="speed" onChange={e =>  handleChange(e)}/>
                    {errors.speed && <p>{errors.speed}</p> }
                
                    <label>Altura:</label>
                    <input className={style.input} type="number" value={input.height} name="height" onChange={e =>  handleChange(e)}/>
                    {errors.height && <p>{errors.height}</p> }
             
                    <label>Peso:</label>
                    <input className={style.input} type="number"  value={input.weight} name="weight" onChange={e =>  handleChange(e)}/>
                    {errors.weight && <p>{errors.weight}</p> }

                    <label>Tipo:</label>
                    <select className={style.select} onChange={e => handleSelect(e)}>
                        {
                        tipos.map((d)=> (
                            <option key={d.id + d.name} value={d.name} >{d.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <ul>
                        <li className={style.li} >{input.types.map(e => e)}</li>
                    </ul>
                </div>

                <button className={style.button}  type="submit">Crear tu Pokemon</button>
                
            </form>
                {
                input.types?.map((e,i) =>
                    <div key={i}>
                        <p>{e}</p>
                        <button onClick={() => {handleDelete(e)}} >❌</button>
                    </div>
                    )
                }
        </div>
    )

}