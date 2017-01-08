/* global se:true */
/* global $:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('sePanelcontrolgame', {
    templateUrl: 'app/panels/panel_controlgame.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.manage = $managegame;
      var gameplay = null;
      vm.play = function () {
        if (vm.manage.isPlaying) {
          vm.manage.isPlaying = false;
          vm.isPlay = false;
          $('#gameview canvas').show();
          $('#gameview').html('');
          vm.game.viewport = new se.ViewPort('gameview');
          gameplay = null;
        } else {
          $('#gameview canvas').hide();
          var div = $('<div id="gameviewplay"/>');
          $('#gameview').append(div);
          gameplay = new se.StarEngine('gameviewplay');
          var scene = vm.game.getSceneCurrent();
          var newscene = scene.clone(gameplay);
          gameplay.addScene(newscene);
          gameplay.run();
          vm.manage.isPlaying = true;
        }
      };
    }
  });
