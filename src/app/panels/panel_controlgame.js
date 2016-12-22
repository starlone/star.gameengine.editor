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
      vm.play = function () {
        $('#gameviewplay').html('');
        $('#modalGame').modal('show');
      };
      $('#modalGame').on('shown.bs.modal', function () {
        var gameplay = new se.StarEngine('gameviewplay');
        var scene = vm.game.getSceneCurrent();
        var newscene = scene.clone(gameplay);
        gameplay.addScene(newscene);
        gameplay.run();
        gameplay.viewport.resetPivot();
        gameplay.updateSize();
      });
    }
  });
