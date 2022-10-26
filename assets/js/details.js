
const containerPokemon=document.getElementById('container-pokemon')

function queryObj() {
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
}
var myParam = queryObj();

function convertPokemonDetail(pokemonDetail){
    const pokemon=new PokemonDetails()
    pokemon.number= pokemonDetail.id
    pokemon.name= pokemonDetail.name
    const types =pokemonDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type]=types//pegando o primeiro elementos do array
    pokemon.types= types
    pokemon.type= type

    pokemon.photo=pokemonDetail.sprites.other.dream_world.front_default

    const statusName = pokemonDetail.stats.map((stat)=> `<li>${stat.stat.name}`+": "+`${stat.base_stat}</li>`).join('')
    

    pokemon.status={
        nameStatus:[statusName]
    }
    
   
    const habilidades=pokemonDetail.abilities.map((ability)=>ability.ability.name)

    pokemon.abilities=habilidades
    return pokemon

}


function getPokemon(pokemon){

    const a = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    return fetch(a)

        .then((response)=>  response.json()) //esse return passa para o proximo then)
         //esse return passa para o proximo then)
    
        .then((body)=>convertPokemonDetail(body))    
         
        .catch((erro)=>console.log(erro))
}



function loadPokemon(pokemon){
        getPokemon(pokemon).then((body)=>{
        
        const newHtml=`
        
        <div class="${body.type} container-pokemon  ">
        <div class="name-pokemon "><h1>${body.name}</h1></div>
        <div class="types-pokemon">
            <ol class="atributes-pokemon">
                ${body.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div class="number-pokemon">#${body.number}</div>
        </div>
        
        <div class="imagem-pokemon ">
            <img src="${body.photo}" alt="Bulbasaur">
        </div>
        <div class="description">

            <div class="Status">
                <h3>Status base:</h3>
                <ol class="status-pokemon"> 
                    ${body.status.nameStatus}                
                </ol>
             </div>
            <div class="habilidades">
                <h3>Habilidades:</h3>
                <ol class="habilidades-pokemon">
                    ${body.abilities.map((abilitis)=>`<li>${abilitis}</li>`).join('')}
                </ol>
            </div>
     

        </div>
        </div>`
        containerPokemon.innerHTML+=newHtml
        }
        
        )
    }


loadPokemon(myParam.name)