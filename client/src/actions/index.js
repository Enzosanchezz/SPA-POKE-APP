import axios from "axios";

const SERVER = "http://localhost:3001"

export function getPokemons(){
    return async function(dispatch){
        let all = await axios.get(`${SERVER}/pokemons`)
        return dispatch({type: "GET_POKEMONS", payload: all.data})
    }
}

export function getNamePokemons(name){
    return async function(dispatch){
            let pokName = await axios.get(`${SERVER}/pokemons?name=${name}`) 
            return dispatch({type : "GET_NAME_POKEMON", payload: pokName.data})
    }
}

export function getType(){
    return async function(dispatch){
        let json = await axios.get(`${SERVER}/types`)
        return dispatch({
            type: 'GET_TYPE',
            payload : json.data
        })
    }
}

export function detailPoke(id){
    return async function(dispatch){
        let details = await axios.get(`${SERVER}/pokemons/${id}`)
        return dispatch({type : "GET_DETAILS", payload: details.data})
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        let data = await axios.post(`${SERVER}/pokemons`, payload)
        return dispatch({type : "POST_POKEMON", data})
    }
}

export function putPokemon(id, payload){
    return async function(dispatch){
        let putPoke = await axios.put(`${SERVER}/pokemons/${id}`, payload)
        return dispatch({type: "PUT_POKEMON", putPoke})
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

