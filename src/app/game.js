/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .factory('$managegame', function () {
    var game = new se.StarEngine('gameview');
    var scene = new se.Scene(game, new se.GradientRenderer('#004CB3', '#8ED6FF'));
    game.addScene(scene);
    var renderOld = null;
    var renderer = new se.MeshRenderer('#ffb74d', '#e65100', 5);
    return {
      game: game,
      selected: null,
      isPlaying: false,
      setSelected: function (obj) {
        if (renderOld) {
          this.selected.setRenderer(renderOld);
        }
        this.selected = null;
        renderOld = null;
        if (obj) {
          this.selected = obj;
          renderOld = obj.getRenderer();
          if (renderOld) {
            obj.setRenderer(renderer);
          }
        }
      }
    };
  });

