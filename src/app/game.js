/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .factory('$managegame', function () {
    var game = new se.StarEngine('gameview');
    var scene = new se.Scene(game, new se.GradientRenderer('#004CB3', '#8ED6FF'));
    game.addScene(scene);
    return {
      game: game,
      selected: null
    };
  });

