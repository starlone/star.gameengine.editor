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
          gameplay = null;
        } else {
          $managegame.setSelected(null);
          gameplay = new se.StarEngine();
          vm.manage.gamePlay = gameplay;
          var scene = vm.game.getSceneCurrent();
          var newscene = scene.clone(gameplay);
          gameplay.addScene(newscene);
          gameplay.run();
          vm.manage.isPlaying = true;
        }
      };
    }
  });
