$(document).ready(function() {
  //call back method:
  //
  // $('button').on('click', function() {
  //   $.get('https://pokeapi.co/api/v2/pokemon/', resp => {
  //     //random range for 3
  //     let pokemonArr = [];
  //     for (let i = 0; i < 3; i++) {
  //       pokemonArr.push(resp.results[Math.floor(Math.random() * 948)]);
  //       $.get(pokemonArr[i], resp => {
  //         // console.log(resp);
  //         $.get(resp.species.url, resp => {
  //           // console.log(resp);
  //           for (let j = 0; j < resp.flavor_text_entries.length; j++) {
  //             if (resp.flavor_text_entries[j].language.name === 'en') {
  //               console.log(
  //                 resp.name + ':\n',
  //                 resp.flavor_text_entries[j].flavor_text
  //               );
  //               return;
  //             }
  //           }
  //         });
  //       });
  //     }
  //   });
  // });

  //promise method:
  //
  // $('button').on('click', function() {
  //   let pokemonArr = [];
  //   $.get('https://pokeapi.co/api/v2/pokemon/').then(resp => {
  //     for (let i = 0; i < 3; i++) {
  //       $.get(resp.results[Math.floor(Math.random() * 948)].url).then(resp => {
  //         $.get(resp.species.url).then(resp => {
  //           for (let j = 0; j < resp.flavor_text_entries.length; j++) {
  //             if (resp.flavor_text_entries[j].language.name === 'en') {
  //               console.log(
  //                 resp.name + ':\n',
  //                 resp.flavor_text_entries[j].flavor_text
  //               );
  //               return;
  //             }
  //           }
  //         });
  //       });
  //     }
  //   });
  // });

  //async and await method:
  //
  $('button').on('click', async function() {
    getPokemon();
  });

  async function getPokemon() {
    let pokemonArr = [];
    let pokemons = await $.get('https://pokeapi.co/api/v2/pokemon/');
    let pokemonImageArr = [];
    let i_count = 0;

    for (let i = 0; i < 3; i++) {
      let randomPokemon = await $.get(
        pokemons.results[Math.floor(Math.random() * 948)].url
      );
      pokemonArr.push(await $.get(randomPokemon.species.url));
      pokemonImageArr.push(randomPokemon.sprites.front_default);
    }
    console.log(pokemonImageArr);
    Promise.all(pokemonArr).then(resp => {
      resp.forEach(resp => {
        for (let j = 0; j < resp.flavor_text_entries.length; j++) {
          if (resp.flavor_text_entries[j].language.name === 'en') {
            console.log(
              resp.name + ':\n',
              resp.flavor_text_entries[j].flavor_text
            );
            createHTML(
              resp.name,
              pokemonImageArr[i_count],
              resp.flavor_text_entries[j].flavor_text
            );
            i_count++;
            console.log(i_count);
            return;
          }
        }
      });
    });
  }

  function createHTML(name, image, desc) {
    let template = `
    <div class="card" style="width: 16rem;">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${desc}</p>
    </div>
    </div>
    </div>`;

    $('.card-group').append(template);
  }
});
