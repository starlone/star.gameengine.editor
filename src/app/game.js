/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .factory('$managegame', function () {
    var game = new se.StarEngine();
    game.runner.enabled = false;
    var scene = new se.Scene(new se.GradientRenderer('#004CB3', '#8ED6FF'));
    game.addScene(scene);
    game.run();
    var renderOld = null;
    var renderer = new se.MeshRenderer('#ffb74d', '#e65100', 5);
    return {
      game: game,
      gamePlay: null,
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

