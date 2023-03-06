import axios from "axios";
import Swal from "sweetalert2";
const {REACT_APP_SERVER} = process.env;

export function getPokemons(){
    return async function(dispatch){
        let all = await axios.get(`${REACT_APP_SERVER}/pokemons`)
        return dispatch({type: "GET_POKEMONS", payload: all.data})
    }
}

export function getNamePokemons(name){
    return async function(dispatch){
        try {
            let pokName = await axios.get(`${REACT_APP_SERVER}/pokemons?name=${name}`) 
            return dispatch({type : "GET_NAME_POKEMON", payload: pokName.data})
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No existe Pokemon llamado ${name} `,
              })
        }
            
    }
}

export function getType(){
    return async function(dispatch){
        let json = await axios.get(`${REACT_APP_SERVER}/types`)
        return dispatch({
            type: 'GET_TYPE',
            payload : json.data
        })
    }
}

export function detailPoke(id){
    return async function(dispatch){
        let details = await axios.get(`${REACT_APP_SERVER}/pokemons/${id}`)
        return dispatch({type : "GET_DETAILS", payload: details.data})
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        let data = await axios.post(`${REACT_APP_SERVER}/pokemons`, payload)
        return dispatch({type : "POST_POKEMON", data})
    }
}

export function putPokemon(id, payload){
    return async function(dispatch){
        let putPoke = await axios.put(`${REACT_APP_SERVER}/pokemons/${id}`, payload)
        return dispatch({type: "PUT_POKEMON", putPoke})
    }
}
export function DeletePokemon(id, payload){
    return async function(dispatch){
        let deletePoke = await axios.delete(`${REACT_APP_SERVER}/pokemons/${id}`, payload)
        return dispatch({type: "DELETE_POKEMON", deletePoke})
    }
}

export function filterCreated(payload){
    return{
        type : "FILTER_CREATED",
        payload
    }
}

export function filterType(payload){
    return{
        type: "FILTER_TYPE",
        payload
    }
}

export function filterOrder(payload){
    return{
        type: "FILTER_ORDER",
        payload
    }
}
export function filterAttack(payload){
    return{
        type: "FILTER_ATTACK",
        payload
    }
}
export function addFav(payload){
    return{
        type: "ADD_FAV",
        payload
    }
}
export function deleteFav(payload){
    return{
        type: "DELETE_FAV",
        payload
    }
}
export function deleteDetail(){
    let array = []
    return {
        type: "DELETE_DETAIL",
        payload : array
    }
}

