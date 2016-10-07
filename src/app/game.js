/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .factory('$game', function () {
    var game = new se.StarEngine('canvas');
    var scene = new se.Scene(game, new se.GradientRenderer('#004CB3', '#8ED6FF'));
    game.addScene(scene);
    return game;
  });

