/* global $:true */

angular
  .module('app')
  .component('sePanelcontrolgame', {
    templateUrl: 'app/panels/panel_controlgame.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.manage = $managegame;
      var gameplay = null;
      var div = $('<div id="gameviewplay"/>').hide();
      $('#gameview').append(div);
      vm.play = function () {
        if (vm.manage.isPlaying) {
          vm.manage.isPlaying = false;
          $('#gameview canvas').show();
          $('#gameviewplay').hide();
          gameplay = null;
        } else {
          $managegame.setSelected(null);
          $('#gameview canvas').hide();
          $('#gameviewplay').show();
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
