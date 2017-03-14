angular
  .module('app')
  .component('sePanelprojectObject', {
    templateUrl: 'app/panels/panel_project_object.html',
    bindings: {
      seObj: '='
    },
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.scene = $managegame.game.getSceneCurrent();
      vm.manage = $managegame;

      this.$onInit = function () {
        vm.obj = this.seObj;
        vm.children = vm.obj.getChildren();
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
      vm.duplcateObj = function () {
        var obj = $managegame.selected;
        $managegame.setSelected(null); // Remove style of selected
        var newobj = obj.clone();
        obj.getParent().add(newobj);
        $managegame.setSelected(newobj);
      };
      vm.cutObj = function () {
        $managegame.cutSelected();
      };
      vm.pasteObj = function () {
        $managegame.pasteInSelected();
      };
    }
  });
