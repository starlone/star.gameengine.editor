angular
  .module('app')
  .component('seGameview', {
    bindings: {
      ngGame: '=',
      interaction: '='
    },
    templateUrl: 'app/panels/panel_gameview.html',
    controller: function ($element, $scope, $managegame) {
      var vm = $scope;

      vm.manage = $managegame;

      var interaction = this.interaction || true;

      var viewport = new se.ViewPort($element[0]);
      var pan;
      this.$onInit = function () {
        vm.game = this.ngGame;
        vm.game.viewport = viewport;

        if (interaction) {
          pan = new se.PanInteraction(vm.game.getSceneCurrent().getCamera());
          viewport.addInteraction(pan);
          viewport.addInteraction(new se.ZoomInteraction());
        }
      };

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

      function selectObj(e) {
        var coordinate = vm.game.viewport.transformPixelToCoordinate(e.pageX, e.pageY);
        var obj = vm.game.getSceneCurrent().getObjectFromCoordinate(coordinate);
        $managegame.setSelected(obj);
      }

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

      if (interaction) {
        var element = viewport.element;

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

        element.addEventListener('mouseend', finishPan);

        element.addEventListener('touchend', finishPan);

        element.addEventListener('dblclick', selectObj);
      }
    }
  });
