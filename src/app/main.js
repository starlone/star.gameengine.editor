/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope) {
      var vm = $scope;
      vm.game = new se.StarEngine('canvas');

      var scene = new se.Scene(vm.game, new se.GradientRenderer('#004CB3', '#8ED6FF'));
      vm.game.addScene(scene);

      vm.game.run();
    }
  });
