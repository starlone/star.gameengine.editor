/* global se:true */
/* eslint no-undef: 'error' */

angular
  .module('app')
  .component('seGameview', {
    templateUrl: 'app/panels/panel_gameview.html',
    controller: function ($scope, $managegame) {
      var vm = $scope;
      vm.game = $managegame.game;
      vm.game.runner.enabled = false;
      vm.game.run();

      var pan = new se.PanInteraction(vm.game.getSceneCurrent().getCamera());
      vm.game.viewport.addInteraction(pan);
      vm.game.viewport.addInteraction(new se.WheelZoomInteraction());

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
        vm.$apply();
      };

      vm.selectObj = function (e) {
        var coordinate = vm.game.viewport.transformPixelToCoordinate(e.pageX, e.pageY);
        var obj = vm.game.getSceneCurrent().getObjectFromCoordinate(coordinate);
        $managegame.setSelected(obj);
      };

      document.addEventListener('keydown', function (e) {
        if ($managegame.selected) {
          keydown(e.keyCode);
        }
      });

      document.addEventListener('sePanEnd', function () {
        vm.$apply();
      });

      function changeObjectPan(coordinate) {
        var obj = vm.game.getSceneCurrent().getObjectFromCoordinate(coordinate);
        if (obj === $managegame.selected) {
          pan.target = $managegame.selected;
          pan.inverse = false;
        } else {
          pan.target = vm.game.getSceneCurrent().getCamera();
          pan.inverse = true;
        }
      }

      function finishPan() {
        pan.target = vm.game.getSceneCurrent().getCamera();
        pan.inverse = true;
      }

      var element = vm.game.viewport.element;

      element.addEventListener('mousedown', function (e) {
        var coordinate = vm.game.viewport.transformPixelToCoordinate(e.pageX, e.pageY);
        changeObjectPan(coordinate);
      });

      element.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          var t = e.touches[0];
          var coordinate = vm.game.viewport.transformPixelToCoordinate(t.pageX, t.pageY);
          changeObjectPan(coordinate);
        }
      });

      element.addEventListener('mouseend', finishPan());

      element.addEventListener('touchend', finishPan());
    }
  });
