angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/gameview.html',
    controller: function ($scope, $game) {
      var vm = $scope;
      vm.game = $game;
      vm.game.run();
      vm.game.updateSize();
      vm.game.element.height = 300;
      vm.game.element.style = 'width: 100%;';
    }
  });
