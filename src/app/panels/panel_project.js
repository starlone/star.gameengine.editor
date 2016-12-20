/* global se:true */
/* eslint no-undef: 'error' */

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
        if (type === 'circle') {
          obj = se.factory.circle({name: 'Circle', x: 0, y: 0, radius: 20, fillColor: '#b0bec5', lineWidth: 1});
        } else {
          obj = se.factory.rect({name: 'Rect', x: 0, y: 0, w: 58, h: 50, fillColor: '#b0bec5'});
        }
        vm.scene.add(obj);
        vm.showObject(obj);
      };

      vm.showObject = function (obj) {
        $managegame.selected = obj;
      };
    }
  });
