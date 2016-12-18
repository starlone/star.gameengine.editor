angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/panels/panel_gameview.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.game.runner.enabled = false;
      vm.game.run();
    }
  });
