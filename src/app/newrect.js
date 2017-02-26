angular
  .module('app')
  .component('seNewrect', {
    templateUrl: 'app/newrect.html',
    controller: function ($scope, $managegame, $semodal) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.width = 50;
      vm.height = 50;
      vm.name = 'Rect';

      vm.submit = function () {
        var obj = se.factory.rect({name: vm.name, x: 0, y: 0, w: vm.width, h: vm.height, fillColor: '#b0bec5'});
        console.log(obj);
        vm.scene.add(obj);
        $managegame.setSelected(obj);
        $semodal.hide();
      };
    }
  });
