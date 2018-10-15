$(document).ready(function() {
  //callback method:

  // $.get('http://numbersapi.com/68?json', function(resp) {
  //   console.log(resp);
  //   $('ul').append('<li>', resp.text);
  //   $.getJSON('http://numbersapi.com/68?json', function(resp) {
  //     console.log(resp);
  //     $('ul').append('<li>', resp.text);
  //     $.getJSON('http://numbersapi.com/68?json', function(resp) {
  //       console.log(resp);
  //       $('ul').append('<li>', resp.text);
  //       $.getJSON('http://numbersapi.com/68?json', function(resp) {
  //         console.log(resp);
  //         $('ul').append('<li>', resp.text);
  //       });
  //     });
  //   });
  // });

  //promise method:

  // let numbersArr = [];

  // for (let i = 1; i < 5; i++) {
  //   numbersArr.push($.get('http://numbersapi.com/68?json'));
  // }

  // Promise.all(numbersArr).then(resolvedArr => {
  //   resolvedArr.forEach(resp => {
  //     $('ul').append('<li>', resp.text);
  //   });
  // });

  //async and await method:
  //
  async function getNums() {
    let numArr = await Promise.all([
      $.get('http://numbersapi.com/68?json'),
      $.get('http://numbersapi.com/68?json'),
      $.get('http://numbersapi.com/68?json'),
      $.get('http://numbersapi.com/68?json')
    ]);

    numArr.forEach(resp => {
      $('ul').append('<li>', resp.text);
    });
  }

  getNums();
});
