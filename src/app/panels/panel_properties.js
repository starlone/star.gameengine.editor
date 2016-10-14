angular
  .module('app')
  .component('sePanelproperties', {
    templateUrl: 'app/panels/panel_properties.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;

      vm.manage = $managegame;

      vm.showProperties = function (obj) {
        var pos = obj.transform.position;
        vm.prop = {
          name: obj.name,
          x: pos.x,
          y: pos.y
        };
        vm.prop.obj = obj;
      };
    }
  });
