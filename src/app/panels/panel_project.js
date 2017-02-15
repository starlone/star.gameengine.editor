angular
  .module('app')
  .component('sePanelproject', {
    templateUrl: 'app/panels/panel_project.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.manage = $managegame;

      vm.newObject = function (type) {
        var obj;
        var draw = false;
        if (type === 'circle') {
          obj = se.factory.circle({name: 'Circle', x: 0, y: 0, radius: 20, fillColor: '#b0bec5', lineWidth: 1});
        } else if (type === 'rect') {
          obj = se.factory.rect({name: 'Rect', x: 0, y: 0, w: 58, h: 50, fillColor: '#b0bec5'});
        } else {
          obj = new se.GameObject('New Draw', 0, 0);
          obj.setRenderer(new se.MeshRenderer('#b0bec5', '#b0bec5', 2));
          draw = true;
        }
        vm.scene.add(obj);
        vm.showObject(obj);
        if (draw) {
          $managegame.setDraw(obj);
        }
      };

      vm.showObject = function (obj) {
        $managegame.setSelected(obj);
      };

      vm.deleteObj = function () {
        $managegame.deleteSelected();
      };
      vm.editObj = function () {
        $managegame.setEditable();
      };
    }
  });
