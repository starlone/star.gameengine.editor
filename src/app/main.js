/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope, $game) {
      var vm = $scope;
      vm.game = $game;

      vm.scene = vm.game.getSceneCurrent();

      var ground = se.factory.rect({name: 'Ground', x: 1000, y: 250, w: 3800, h: 30, fillColor: 'green', rigidopts: {isStatic: true}});
      vm.scene.add(ground);

      vm.newObject = function (type) {
        var obj;
        if (type === 'circle') {
          obj = se.factory.circle({name: 'Circle', x: 0, y: 0, radius: 20, fillColor: '#b0bec5', lineWidth: 1});
        } else {
          obj = se.factory.rect({name: 'Rect', x: 0, y: 0, w: 58, h: 50, fillColor: '#b0bec5'});
        }
        vm.scene.add(obj);
        vm.showProperties(obj);
      };

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
