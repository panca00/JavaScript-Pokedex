
    const pokeApi={}
    
    function convertPokeApiDetailToPokemon(pokemonDetail){
        const pokemon=new Pokemon()
        pokemon.number= pokemonDetail.id
        pokemon.name= pokemonDetail.name

        const types =pokemonDetail.types.map((typeSlot)=> typeSlot.type.name)
        const [type]=types//pegando o primeiro elementos do array
        pokemon.types= types
        pokemon.type= type

        pokemon.photo=pokemonDetail.sprites.other.dream_world.front_default

        return pokemon
    }


    pokeApi.getPokemonDetail=(pokemon) =>{

        return fetch(pokemon.url)
                    .then((reponse)=>reponse.json())
                    .then(convertPokeApiDetailToPokemon)


    }

    pokeApi.getPokemons = (offset=0,limit=50) =>{

        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

        return fetch(url)

            .then((response)=>  response.json())//esse return passa para o proximo then)
                
            .then((responseBody)=> responseBody.results)
            //um fetch encadeiado
            .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))

            .then((detailRequests)=>Promise.all(detailRequests))

            .catch((erro)=>console.log(erro))
            
    }
    
    
 