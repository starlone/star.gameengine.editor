angular
  .module('app')
  .component('sePanelproject', {
    templateUrl: 'app/panels/panel_project.html',
    controller: function ($scope, $managegame, $semodal) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.manage = $managegame;

      vm.newObject = function (type) {
        var obj;
        if (type === 'circle') {
          $semodal.show(vm, '<se-newcircle />');
          return;
        } else if (type === 'rect') {
          $semodal.show(vm, '<se-newrect />');
          return;
        } else if (type === 'draw') {
          obj = new se.GameObject('New Draw', 0, 0);
          obj.setRenderer(new se.MeshRenderer('#b0bec5', '#b0bec5', 2));
          vm.scene.add(obj);
          vm.showObject(obj);
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
      vm.copyObj = function () {
        var obj = $managegame.selected;
        $managegame.setSelected(null); // Remove style of selected
        var newobj = obj.clone();
        vm.scene.add(newobj);
        this.showObject(newobj);
      };
    }
  });
