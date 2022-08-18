const { Pokemon, Types } = require("../db");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const {LOCALHOST_URL} = process.env;
   
const getApi = async () => {
    try {
        const poke1 = await axios("https://pokeapi.co/api/v2/pokemon")
        const poke2 = await axios(poke1.data.next)
        const pokeData = poke1.data.results.concat(poke2.data.results)
        // console.log("pokeData", pokeData)
        const pokemon = await Promise.all(pokeData.map(async poke => {
            let pDetail = await axios(poke.url)
              return {  
                id: pDetail.data.id,
                  name: pDetail.data.name,
                  img: pDetail.data.sprites.other.home.front_default,
                  types: pDetail.data.types.map(t => t.type.name+ " "),
                  hp: pDetail.data.stats[0].base_stat,
                  attack: pDetail.data.stats[1].base_stat,
                  defense: pDetail.data.stats[2].base_stat,
                  speed: pDetail.data.stats[5].base_stat,
                  height: pDetail.data.height, 
                  weight: pDetail.data.weight
            }
        }))
        return pokemon;
    } catch (error) {
      console.log(error)
        throw new Error(error)
    }
}


const getDb = async () => {
    const pokemon =  await Pokemon.findAll({
        include:{
            model: Types,
            attributes : ['name'],
            through :{
                attributes : [],
            }
        }
    })
    const pokeFilter = pokemon?.map( pok => {
        return {
        ...pok.dataValues,
        types: pok.types?.map(t => t.name)
      }})
      return pokeFilter;
}
const getAllPokemons = async () => {
    try{
      let apiData = await getApi();
      let dbData = await getDb();
      let allData =  dbData.concat(apiData);
      // console.log("allData", allData)
      return allData;
  } catch(error){
      throw new Error(error)
    }
  }

const getPokemons = async(req,res)=>{
    const {name} = req.query
    const allPokemons = await getAllPokemons();
    if(name){
      let pokeName = await allPokemons.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
      pokeName.length? res.status(200).send(pokeName) : res.status(404).send("No existe el pokemon con ese nombre")
    }else{
      res.status(200).send(allPokemons)
    }
  }
  
// const getPokemons = async(req,res)=>{
//     let { name } = req.query
//    try {
//       if(name){
//         name = name.toLowerCase()
//         let pokeBd = await Pokemon.findOne({ 
//           where: { name }, 
//           include: {
//             model: Types,
//             attributes: ['name'],
//             through: {
//               attributes: [] 
//             }
//           }
//       })
//         if(pokeBd){ 
//           return res.status(200).json(pokeBd)
//         }
//           let poke = await axios.get("https://pokeapi.co/api/v2/pokemon/"+name)
//         if(poke){
//           let pokemon = {  
//               id: poke.data.id,
//               name: poke.data.name,
//               img: poke.data.sprites.other.home.front_default,
//               types: poke.data.types.map(t => t.type.name),
//               hp: poke.data.stats[0].base_stat,
//               attack: poke.data.stats[1].base_stat,
//               defense: poke.data.stats[2].base_stat,
//               speed: poke.data.stats[5].base_stat,
//               height: poke.data.height, 
//               weight: poke.data.weight
//             }
//               return res.status(200).json(pokemon)
//         } else { 
//             return res.status(404).json({Error: error.message})}
//         } else {
//           let allPokemon = await getAllPokemons() // si no pasaron name por query devuelve todos los pokemons
//           return res.status(200).json(allPokemon)
//         }
//       } catch (error) {
//     res.status(404).json({Error: error.message})
//   }
// }
 const getPokeId = async (req, res) => {
  const {id} = req.params
  const allPokemons = await getAllPokemons()
  const pokeId = allPokemons.filter((p)=> p.id == id)
  if(id){
    pokeId.length? res.status(200).send(pokeId) : res.status(404).send("No existe el pokemon con ese id")
  }
}

// const getPokeId = async (req, res) => {
//     const { id } = req.params 
//     // console.log("id", id, Number(id), typeof id)
//       try {
//         if(Number(id)){
//           let pokemon = await axios("https://pokeapi.co/api/v2/pokemon/"+id)  
//           if(pokemon){
//             let pokeById = { 
//               id: pokemon.data.id,
//                 name: pokemon.data.name,
//                 img: pokemon.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
//                 types: pokemon.data.types.map(t => t.type.name),
//                 hp: pokemon.data.stats[0].base_stat,
//                 attack: pokemon.data.stats[1].base_stat,
//                 defense: pokemon.data.stats[2].base_stat,
//                 speed: pokemon.data.stats[5].base_stat,
//                 height: pokemon.data.height, 
//                 weight: pokemon.data.weight
//             }
//             return res.json(pokeById)   
//           }
//         } else{
//           const poke = await Pokemon.findByPk(id, { include: Types }) 
//           // console.log("POKEBACKEND", poke)
//           const pokemonDb = {
//             id: poke.id,
//             name: poke.name,
//             img: poke.img,
//             types: poke.types.map(t => t.name),
//             hp: poke.hp,
//             attack: poke.attack,
//             defense: poke.defense,
//             speed: poke.speed,
//             height: poke.height,
//             weight: poke.weight,
//             createdInDb: poke.createdInDb
//           };
//           // console.log("POKEBACKEND2", pokemonDb)
//           return res.json(pokemonDb) 
//         }
//       } catch (error) {
//         res.status(404).send("No se encontró el pokemón")
//       }
//     }                  

const getTypes = async (req, res) => {
        const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
       let types = typesApi.data.results.map((t)=> t.name + " ")
       
       types.forEach(el =>{
         Types.findOrCreate({ 
           where : {name: el}
         })
       })
       eachTypes = await Types.findAll()
       res.status(200).send(eachTypes)
       }
 

const postPoke = async(req, res) => {
        const {
            name,
            types,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
            createdInDb} = req.body
        let typeCreate = await Pokemon.create ({name, hp, attack, defense, speed, height, weight, img, createdInDb})
        let typeDb = await Types.findAll({
            where: {
                name : types
            }
        })
        typeCreate.addTypes(typeDb)
    
         res.send(`Pokemon ${req.body.name} creado con exito 👍`)
}

const putPoke = async (req, res) => {
  const {id} = req.params
  let { name, hp, attack, defense, speed, height, weight, img, createdInDb} = req.body
  try {
    const putP = await Pokemon.findByPk(id)
    if (!putP){
      res.status(404).send("No se encontro Pokemon")
    }else{
      await putP.update({
          name: name, 
          hp: hp, 
          attack: attack, 
          defense: defense, 
          speed : speed, 
          height: height, 
          weight: weight, 
          img: img
          },

          {where: {
          id : id
          }
        }
      ) 
      return res.status(200).send(putP)
    }
  } catch (error) {
    throw new Error(error)
  }
}


   



module.exports = {
    getPokeId,
    getPokemons,
    getTypes,
    postPoke,
    putPoke,
}