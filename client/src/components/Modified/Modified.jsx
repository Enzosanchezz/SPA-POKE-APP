import React, { useEffect, useState } from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
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
            Swal.fire("Completa los campos obligatorios para poder Modificar tu Pokemon")
        }else{
            Swal.fire({
                title: 'Esta seguro de modificar su pokemon?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No guardar`,
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                dispatch(putPokemon(props.match.params.id, input))
                  Swal.fire('Poke actualizado!', '', 'success')
                  history.push('/home')
                } else if (result.isDenied) {
                  Swal.fire('Cambios no guardados', '', 'info')
                  history.push('/home')
                }
              })
              
            
           
            
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
            <Link to={"/home"} className={style.link} ><IoReturnDownBackOutline/></Link>
            <h1 className={style.h1} >Modifica tu Pokemon</h1>
            </span>

            <form onSubmit={e => handleSubmit(e)} >
                <div className={style.divInput} >
                    <label>Nombre*:</label>
                    <input className={style.input} type="text" min={0} max={100} value={input.name} name="name" onChange={e =>  handleChange(e)}/>
                    {errors.name &&(<p>{errors.name}</p>)}
              
                    <label>Imagen: </label>
                    <input className={style.input} type="text" min={0} max={100} value={input.img} name="detail.img" onChange={e =>  handleChange(e)}/>
              
                    <label>Hp:</label>
                    <input className={style.input} type="number" min={0} max={100}  value={input.hp} name="hp" onChange={e =>  handleChange(e) }/>
                    {errors.hp && <p>{errors.hp}</p>}
               
                    <label>Attack: </label>
                    <input className={style.input} type="number" min={0} max={100}  value={input.attack} name="attack" onChange={e =>  handleChange(e)}/>
                    {errors.attack && <p>{errors.attack}</p>}
              
                    <label>Defense:</label>
                    <input className={style.input} type="number" min={0} max={100}  value={input.defense} name="defense" onChange={e =>  handleChange(e)}/>
                    {errors.defense && <p>{errors.defense}</p> }
               
                    <label>Speed:</label>
                    <input className={style.input} type="number" min={0} max={100}  value={input.speed} name="speed" onChange={e =>  handleChange(e)}/>
                    {errors.speed && <p>{errors.speed}</p> }
               
                    <label>Height:</label>
                    <input className={style.input} type="number" min={0} max={100} value={input.height} name="height" onChange={e =>  handleChange(e)}/>
                    {errors.height && <p>{errors.height}</p> }
               
                    <label>Weight:</label>
                    <input className={style.input} type="number" min={0} max={100}  value={input.weight} name="weight" onChange={e =>  handleChange(e)}/>
                    {errors.weight && <p>{errors.weight}</p> }
                
                </div>
                <br />
                
                <button className={style.button} type="submit">Modificar tu Pokemon</button>
                
            </form>
               
        </div>
    )

}