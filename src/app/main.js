/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;

      vm.scene = vm.game.getSceneCurrent();

      var ground = se.factory.rect({name: 'Ground', x: 1000, y: 250, w: 3800, h: 30, fillColor: 'green', rigidopts: {isStatic: true}});
      vm.scene.add(ground);
    }
  });
