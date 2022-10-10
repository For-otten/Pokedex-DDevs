var pokemonName = document.querySelector('.pokemon_name');
var pokemonNum = document.querySelector('.pokemon_number');
var pokemonImg = document.querySelector('.pokemon-image');
var button = document.querySelector('.searchBtn');
var closePopup = document.querySelector('.closePopup');
var closeX = document.querySelector('.x');


var pokemonAlt = document.querySelector('.alturaPokemon');
var pokemonPeso = document.querySelector('.pesoPokemon');
var tipoPokemon = document.querySelector('.tipoPokemon')

var form = document.querySelector('.form');
var input = document.querySelector('.input_search')

var buttonPrev = document.querySelector('.btn-prev');
var buttonNext = document.querySelector('.btn-next');

var popup = document.querySelector('.popup');
var allPopupcontent = document.querySelector('.allPopupcontent')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }


}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading..';
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonAlt.innerHTML = data.height / 10;
        pokemonPeso.innerHTML = data.weight / 10;
        tipoPokemon.innerHTML = data.types[0].type.name;
        allPopupcontent.style.display = 'flex'; //popup with content
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNum.innerHTML = '';

        allPopupcontent.style.display = 'none'; //popup no content
    }

}

button.addEventListener('click', () => {
    popup.style.display = 'block'
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
});

closeX.addEventListener('click', () => {
    popup.style.display = 'none'
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});



renderPokemon(searchPokemon);