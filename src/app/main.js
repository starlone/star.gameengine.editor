/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope) {
      var vm = $scope;
      vm.game = new se.StarEngine('canvas');

      vm.scene = new se.Scene(vm.game, new se.GradientRenderer('#004CB3', '#8ED6FF'));
      vm.game.addScene(vm.scene);

      var ground = se.factory.rect({name: 'Ground', x: 1000, y: 300, w: 3800, h: 30, fillColor: 'green', rigidopts: {isStatic: true}});
      vm.scene.add(ground);

      vm.game.run();

      vm.newObject = function () {
        var obj = se.factory.rect({name: 'Rect', x: 0, y: 0, w: 58, h: 50, fillColor: '#b0bec5'});
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
