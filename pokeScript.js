async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Pokémon not found");
        
        const pokemonData = await response.json();
    
        return pokemonData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get("pokemon");

    if (!pokemonName) {
        document.getElementById("pokemon-info").innerHTML = `<p>No Pokémon chosen. Please use the Search Page to select a Pokémon to view.</p>`;
        return;
    }

    const pokeData = await fetchPokemonData(pokemonName);
    const pokemonInfoElement = document.getElementById('pokemon-info');

    if (!pokeData) {
        pokemonInfoElement.innerHTML = `
        <h3>We're sorry!</h3>
        <p>Pokémon not found. Please try again.</p>
        `;
        return;
    }


    pokemonInfoElement.innerHTML = `
        <h3>${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h3>
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <img src="${pokeData.sprites.front_shiny}" alt="Shiny ${pokeData.name}">
        <h4>Type(s):</h4>
        <ul style="list-style-type: none; padding: 0;">
            ${pokeData.types.map(type => `<li>${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>`).join('')}
        </ul>
        <h4>Abilities:</h4>
        <ul style="list-style-type: none; padding: 0;">
            ${pokeData.abilities.map(ability => `<li>${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}${ability.is_hidden ? ' (Hidden Ability)' : ''}</li>`).join('')}
        </ul>
        <h4>Stats:</h4>
        <ul style="list-style-type: none; padding: 0;">
            ${pokeData.stats.map(stat => `<li>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}</li>`).join('')}
        </ul>`;
});

document.getElementById("pokemon-search").addEventListener("submit", (event) => {
    event.preventDefault();

    const pokemonName = document.getElementById("pokemon-name").value.trim().toLowerCase();

    if (pokemonName) {
        window.location.href = `details.html?pokemon=${encodeURIComponent(pokemonName)}`;
        document.getElementById("pokemon-name").value = "";
    } else {
        alert("Please enter a valid Pokémon name");
    }
});