const initalState = {
    pokemons : [],
    allPokemons : [],
    details : [],
    types : [],
    favs : [],
}

function rootReducer(state = initalState, action){

switch(action.type){
    case "GET_POKEMONS": { return {...state, pokemons: action.payload, allPokemons: action.payload, }}

    case "GET_NAME_POKEMON":{return {...state, pokemons: action.payload, allPokemons: action.payload,}}

    case "GET_DETAILS": {return {...state, details : action.payload}}

    case "DELETE_DETAIL":{return {...state, details : action.payload}}
    
    case "GET_TYPE":{return{...state, types: action.payload}}

    case "POST_POKEMON": return{...state}

    case "PUT_POKEMON" : return {...state}
    
    case "DELETE_POKEMON" : return {...state, details : []}

    case "ADD_FAV" : return {...state, favs : [...state.favs.concat(action.payload)]}

    case "DELETE_FAV" : 
    const deleteF = state.favs.filter((f) => f.id != action.payload)
    return {...state, favs : deleteF}

    case "FILTER_CREATED": {
        const filter = action.payload === "created" ? state.allPokemons.filter((c) => c.createdInDb) : state.allPokemons.filter((a) => !a.createdInDb)
        return{...state, pokemons : action.payload === "all" ? state.allPokemons : filter}
    }

    case "FILTER_TYPE":{
        const allPoke = state.allPokemons
        const filterPoke = allPoke.filter((e) => e.types.includes(action.payload)
        )
        return{
            ...state, pokemons: filterPoke
        }
    }
    
    case "FILTER_ORDER":{
        let array = action.payload === 'asc'?
        state.pokemons.sort(function(a , b) {
            if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
            if(a.name.toLowerCase() < b.name.toLowerCase()){return -1} 
            return 0
        }) : 
        state.pokemons.sort(function(a , b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){return -1}
            if(a.name.toLowerCase() < b.name.toLowerCase()){return 1} 
            return 0
        })
        return {...state, pokemons : array}
    }

    case "FILTER_ATTACK":{
        let attack = action.payload === 'attackMin'?
        state.pokemons.sort(function(a , b) {
            if(a.attack > b.attack){return 1}
            if(a.attack < b.attack){return -1} 
            return 0
        }) : 
        state.pokemons.sort(function(a , b){
            if(a.attack > b.attack){return -1}
            if(a.attack < b.attack){return 1} 
            return 0
        })
        return {...state, pokemons : attack}
    }



    default: return state
}

}


export default rootReducer