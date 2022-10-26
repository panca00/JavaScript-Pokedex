
const loadMoreButton=document.getElementById('loadMoreButton')
const limit =16;
let offset=0;
const maxRecords=151


function loadPokemonItens(offset,limit){
    

    pokeApi.getPokemons(offset,limit).then((pokemons=[])=>{
        const newHtml=pokemons.map((pokemon)=>     
            `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name"> <a href="pokemon.html?name=${pokemon.name}">${pokemon.name}</a></span>
                    
                    <div class="detail">
                        
                        <ol class="types">
                            ${pokemon.types.map((type)=>`<li class="type  ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}" srcset="">
                        
                    </div>
                </li>
                `
            ).join('')
        pokemonList.innerHTML+=newHtml
    })

}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click',()=>{
    offset+=limit;

    const qtdwithRecord = offset+limit
    if(qtdwithRecord>=maxRecords){
        const newLimit=maxRecords-offset
        loadPokemonItens(offset,newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
        
    }else{
        loadPokemonItens(offset,limit)
    }
})