angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/panels/panel_gameview.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.game.runner.enabled = false;
      vm.game.run();

      // Move object by keyboard
      var keydown = function (key) {
        var x = 0;
        var y = 0;
        if (key === 37) { // Left
          x = -3;
        } else if (key === 39) { // 'right'
          x = 3;
        } else if (key === 38) { // Up
          y = -3;
        } else if (key === 40) { // 'Down'
          y = 3;
        }
        $managegame.selected.transform.move(x, y);
      };

      document.addEventListener('keydown', function (e) {
        if ($managegame.selected) {
          keydown(e.keyCode);
        }
      });

      var x = 0;
      var y = 0;
      var gameview = document.getElementById('gameview');
      var isDown = false;
      gameview.addEventListener('mousedown', function (e) {
        x = e.offsetX;
        y = e.offsetY;
        isDown = true;
      });
      gameview.addEventListener('mouseup', function () {
        isDown = false;
      });
      gameview.addEventListener('mousemove', function (e) {
        if (!isDown) {
          return;
        }
        var x2 = x;
        var y2 = y;
        x = e.offsetX;
        y = e.offsetY;
        var x3 = x2 - x;
        var y3 = y2 - y;
        vm.game.getSceneCurrent().getCamera().transform.move(x3, y3);
      });
    }
  });
