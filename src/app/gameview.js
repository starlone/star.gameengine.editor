angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/gameview.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.game.runner.enabled = false;
      vm.game.run();
      vm.playmsg = 'Play physics';

      vm.play = function () {
        // Toggle
        vm.game.runner.enabled = !vm.game.runner.enabled;
        if (vm.game.runner.enabled) {
          vm.playmsg = 'Stop physics';
        } else {
          vm.playmsg = 'Play physics';
        }
      };
    }
  });
