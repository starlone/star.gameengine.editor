angular
  .module('app')
  .component('seNewrect', {
    templateUrl: 'app/modals/newrect.html',
    controller: function ($scope, $managegame, $semodal) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.width = 50;
      vm.height = 50;
      vm.name = 'Rect';

      vm.submit = function () {
        var center = $managegame.game.viewport.getCenter();
        var obj = se.factory.rect({name: vm.name, x: center.x, y: center.y, w: vm.width, h: vm.height, fillColor: '#b0bec5'});
        vm.scene.add(obj);
        $managegame.setSelected(obj);
        $semodal.hide();
      };
    }
  });
