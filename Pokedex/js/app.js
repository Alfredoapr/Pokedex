document.addEventListener('DOMContentLoaded',() => { /*funcion para esperar a que cargue totatlmente el html*/
    fetchData();
    console.log('hola mundo');
})

var name = "hola";

function extractName(name) {
    const pokemonName = document.querySelector('.pokemon_name')
    console.log(pokemonName);
    name = `${pokemonName}`
}

const fetchData = async (name) =>{      //es asincorna porque tenemos que esperar a que nos regrese la data
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) /*Await: esperate hasta que extraigass la información, Extramos la información en bruto */
        const data = await res.json();  
        console.log(data);
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            vida: data.stats[0].base_stat,
            habilidades: data.abilities[0].ability.name + ", " + data.abilities[1].ability.name + ", "+ data.abilities[2].ability.name,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defense: data.stats[2].base_stat,
        }

        datesCard(pokemon);        /*convertimos la información en un json */
    } catch (error) {
        console.log(error);
    }
}

const datesCard = (pokemon) =>{
    console.log(pokemon);

    const flex = document.querySelector('.flex')
    const template = document.getElementById('template_card').content
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment() 

    clone.querySelector('.card_body_img').setAttribute('src',pokemon.img)
    clone.querySelector('.card_name').innerHTML = `${pokemon.name} <span>${pokemon.vida}</span>`
    clone.querySelector('.card_description').innerHTML = `${pokemon.habilidades}`
    clone.querySelectorAll('.card-footer-powers h3')[0].textContent = pokemon.ataque; /*esto nos devuelve un array */
    clone.querySelectorAll('.card-footer-powers h3')[1].textContent = pokemon.especial; /*esto nos devuelve un array */
    clone.querySelectorAll('.card-footer-powers h3')[2].textContent = pokemon.defense; /*esto nos devuelve un array */

    fragment.appendChild(clone)
    flex.appendChild(fragment)

}

