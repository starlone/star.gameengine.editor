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

      var viewport = new se.ViewPort($element[0]);
      var pan;
      this.$onInit = function () {
        vm.game = this.ngGame;
        vm.game.viewport = viewport;

        var interaction = this.interaction || true;

        if (interaction) {
          pan = new se.PanInteraction(vm.game.getSceneCurrent().getCamera());
          viewport.addInteraction(pan);
          viewport.addInteraction(new se.ZoomInteraction());
          viewport.addInteraction(new SelectPanInteraction());
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

      $(document).off('keydown.se');
      $(document).on('keydown.se', function (e) {
        if ($managegame.selected) {
          keydown(e.keyCode);
        }
      });

      $(document).off('sePanEnd');
      $(document).on('sePanEnd', function () {
        vm.$apply();
      });

      $(document).off('seDrawEnd');
      $(document).on('seDrawEnd', function () {
        if ($managegame.selected) {
          $managegame.selected.setRigidBody(new se.RigidBody());
        }
        $managegame.setSelected(null);
        $scope.$apply();
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

      function SelectPanInteraction() {
        this.mousedown = function (e) {
          var coordinate = vm.game.viewport.transformPixelToCoordinate(e.pageX, e.pageY);
          changeObjectPan(coordinate);
        };
        this.touchstart = function (e) {
          if (e.touches.length === 1) {
            var t = e.touches[0];
            var coordinate = vm.game.viewport.transformPixelToCoordinate(t.pageX, t.pageY);
            changeObjectPan(coordinate);
          }
        };
        this.finishPan = function () {
          pan.target = vm.game.getSceneCurrent().getCamera();
          pan.inverse = true;
        };

        this.selectObj = function (e) {
          var coordinate = vm.game.viewport.transformPixelToCoordinate(e.pageX, e.pageY);
          var obj = vm.game.getSceneCurrent().getObjectFromCoordinate(coordinate);
          $managegame.setSelected(obj);
          $scope.$apply();
        };
      }
      se.inherit(se.Interaction, SelectPanInteraction);
      SelectPanInteraction.prototype.active = function () {
        var element = this.parent.element;
        element.addEventListener('mousedown', this.mousedown);
        element.addEventListener('touchstart', this.touchstart);
        element.addEventListener('mouseend', this.finishPan);
        element.addEventListener('touchend', this.finishPan);
        element.addEventListener('dblclick', this.selectObj);
      };
      SelectPanInteraction.prototype.desactive = function () {
        var element = this.parent.element;
        element.removeEventListener('mousedown', this.mousedown);
        element.removeEventListener('touchstart', this.touchstart);
        element.removeEventListener('mouseend', this.finishPan);
        element.removeEventListener('touchend', this.finishPan);
        element.removeEventListener('dblclick', this.selectObj);
      };
    }
  });
