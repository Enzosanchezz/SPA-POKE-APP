import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { detailPoke, putPokemon } from "../../actions";
import style from "./style.module.css";

export default function Modified(props){
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(detailPoke(props.match.params.id)) 
    }, [dispatch])
    
    const detail = useSelector((state) => state.details)
    // console.log('detail :>> ', detail);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    // console.log('tipos :>> ', tipos);
    const [input, setInput] = useState({
        name: "",
        img: detail[0].img,
        hp: "",
        attack : "",
        defense:"",
        speed: "",
        height: "",
        weight: "",
    })

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

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length){
            alert("Completa los campos obligatorios para poder crear un Pokemon")
        }else{
            dispatch(putPokemon(props.match.params.id, input))
            alert("Pokemon Modificado!")
            history.push('/home')
        } 
    }

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
            <Link to={"/home"} className={style.link} >🢀 Volver</Link>
            <h1>Modifica tu Pokemon</h1>
            </span>

            <form onSubmit={e => handleSubmit(e)} >
                <div>
                    <label>Nombre*:</label>
                    <input className={style.input} type="text" value={input.name} name="name" onChange={e =>  handleChange(e)}/>
                    {errors.name &&(<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Imagen: </label>
                    <input className={style.input} type="text" value={input.img} name="detail.img" onChange={e =>  handleChange(e)}/>
                </div>
                <div>
                    <label>Hp:</label>
                    <input className={style.input} type="number"  value={input.hp} name="hp" onChange={e =>  handleChange(e) }/>
                    {errors.hp && <p>{errors.hp}</p>}
                </div>
                <div>
                    <label>Attack: </label>
                    <input className={style.input} type="number"  value={input.attack} name="attack" onChange={e =>  handleChange(e)}/>
                    {errors.attack && <p>{errors.attack}</p>}
                </div>
                <div>
                    <label>Defense:</label>
                    <input className={style.input} type="number"  value={input.defense} name="defense" onChange={e =>  handleChange(e)}/>
                    {errors.defense && <p>{errors.defense}</p> }
                </div>
                <div>
                    <label>Speed:</label>
                    <input className={style.input} type="number"  value={input.speed} name="speed" onChange={e =>  handleChange(e)}/>
                    {errors.speed && <p>{errors.speed}</p> }
                </div>
                <div>
                    <label>Height:</label>
                    <input className={style.input} type="number" value={input.height} name="height" onChange={e =>  handleChange(e)}/>
                    {errors.height && <p>{errors.height}</p> }
                </div>
                <div>
                    <label>Weight:</label>
                    <input className={style.input} type="number"  value={input.weight} name="weight" onChange={e =>  handleChange(e)}/>
                    {errors.weight && <p>{errors.weight}</p> }
                </div>
                <br />
                
                <button className={style.button} type="submit">Modificar tu Pokemon</button>
                
            </form>
               
        </div>
    )

}