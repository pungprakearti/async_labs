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

    for (let i = 0; i < 3; i++) {
      let randomPokemon = await $.get(
        pokemons.results[Math.floor(Math.random() * 948)].url
      );
      pokemonArr.push(await $.get(randomPokemon.species.url));
    }
    Promise.all(pokemonArr).then(resp => {
      resp.forEach(resp => {
        for (let j = 0; j < resp.flavor_text_entries.length; j++) {
          if (resp.flavor_text_entries[j].language.name === 'en') {
            console.log(
              resp.name + ':\n',
              resp.flavor_text_entries[j].flavor_text
            );
            return;
          }
        }
      });
    });
  }
});
