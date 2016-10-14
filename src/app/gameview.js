angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/gameview.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.game.run();
    }
  });
