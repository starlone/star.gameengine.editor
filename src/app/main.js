/* global $:true */

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.manage = $managegame;

      vm.scene = vm.game.getSceneCurrent();

      var ground = se.factory.rect({name: 'Ground', x: 1000, y: 250, w: 3800, h: 30, fillColor: 'green', rigidopts: {isStatic: true}});
      vm.scene.add(ground);

      vm.resize = function () {
        if (window.innerWidth > 768) {
          $('.sidebar').addClass('sidebar-open');
        } else {
          $('.sidebar').removeClass('sidebar-open');
        }
      };

      window.addEventListener('resize', function () {
        vm.resize();
      });
      vm.resize();
    }
  });
