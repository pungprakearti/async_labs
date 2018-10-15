$(document).ready(function() {
  //call back method:
  //
  // $('button').on('click', function() {
  //   $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1', resp => {
  //     let deckArr = [];
  //     deckArr.push(resp.cards[0].image);
  //     $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1', resp => {
  //       deckArr.push(resp.cards[0].image);
  //       $('#cards').append(
  //         $(
  //           `<img src="${deckArr[0]}">
  //           <img src="${deckArr[1]}">`
  //         )
  //       );
  //     });
  //   });
  // });

  //promise method:
  //
  // $('button').on('click', function() {
  //   let deckArr = [];
  //   $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
  //     .then(resp => {
  //       deckArr.push(resp.cards[0].image);
  //       return $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  //     })
  //     .then(resp => {
  //       deckArr.push(resp.cards[0].image);
  //       $('#cards').append(
  //         $(
  //           `<img src="${deckArr[0]}">
  //         <img src="${deckArr[1]}">`
  //         )
  //       );
  //     });
  // });

  //async and await method:
  //
  $('button').on('click', async function() {
    try {
      let deckArr = await Promise.all([
        $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1'),
        $.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      ]);
      $('#cards').append(
        $(
          `<img src="${deckArr[0].cards[0].image}">
        <img src="${deckArr[1].cards[0].image}">`
        )
      );
    } catch (e) {
      console.log('Error getting cards', e);
    }
  });
});
