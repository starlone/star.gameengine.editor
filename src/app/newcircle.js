angular
  .module('app')
  .component('seNewcircle', {
    templateUrl: 'app/newcircle.html',
    controller: function ($scope, $managegame, $semodal) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.radius = 20;
      vm.name = 'Circle';

      vm.submit = function () {
        var obj = se.factory.circle({name: vm.name, x: 0, y: 0, radius: vm.radius, fillColor: '#b0bec5', lineWidth: 1});
        vm.scene.add(obj);
        $managegame.setSelected(obj);
        $semodal.hide();
      };
    }
  });
