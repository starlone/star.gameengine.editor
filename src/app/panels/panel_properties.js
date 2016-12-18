angular
  .module('app')
  .component('sePanelproperties', {
    templateUrl: 'app/panels/panel_properties.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.manage = $managegame;
    }
  });
